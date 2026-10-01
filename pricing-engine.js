(function (root, factory) {
  const engine = factory();
  if (typeof module === "object" && module.exports) module.exports = engine;
  root.SignumPricing = engine;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const number = (value) => Number(value || 0);
  const roundMoney = (value) => Math.round((number(value) + Number.EPSILON) * 100) / 100;

  function calculateUnitCost(variant, config, printOption = {}) {
    const costs = config.costs;
    const includeProduction = printOption.includeProduction !== false;
    const appliedCosts = {
      paper: includeProduction ? number(costs.paper) : 0,
      ink: includeProduction ? number(costs.ink) : 0,
      tape: includeProduction ? number(costs.tape) : 0,
      labor: includeProduction ? number(costs.labor) : 0,
      printerDepreciation: includeProduction ? number(costs.printerDepreciation) : 0,
      pressDepreciation: includeProduction ? number(costs.pressDepreciation) : 0,
      electricity: includeProduction ? number(costs.electricity) : 0
    };
    const subtotal =
      number(variant.purchaseCost) +
      appliedCosts.paper + appliedCosts.ink + appliedCosts.tape + appliedCosts.labor +
      appliedCosts.printerDepreciation + appliedCosts.pressDepreciation;
    const wasteRate = number(config.policy.wasteRate) / 100;
    const costWithWaste = subtotal / (1 - wasteRate);
    const wasteAmount = costWithWaste - subtotal;
    const unitCost = costWithWaste + appliedCosts.electricity;
    return {
      subtotal: roundMoney(subtotal),
      costWithWaste: roundMoney(costWithWaste),
      wasteAmount: roundMoney(wasteAmount),
      unitCost: roundMoney(unitCost),
      unitCostRaw: unitCost,
      appliedCosts
    };
  }

  function calculateQuote(variant, config, quantity, offeredUnitPrice, printOption = {}) {
    const unit = calculateUnitCost(variant, config, printOption);
    const policy = config.policy;
    const outsideRate = (number(policy.taxRate) + number(policy.commissionRate) + number(policy.targetMarginRate)) / 100;
    const technicalPrice = unit.unitCostRaw / (1 - outsideRate);
    const multiple = Math.max(1, number(policy.roundingMultiple));
    const suggestedPrice = Math.ceil(technicalPrice / multiple) * multiple;
    const unitPrice = offeredUnitPrice === "" || offeredUnitPrice == null ? suggestedPrice : number(offeredUnitPrice);
    const units = Math.max(1, number(quantity));
    const saleTotal = unitPrice * units;
    const operationCost = unit.unitCost * units;
    const taxes = saleTotal * number(policy.taxRate) / 100;
    const commission = saleTotal * number(policy.commissionRate) / 100;
    const signumResult = saleTotal - operationCost - taxes - commission;
    const marginRate = saleTotal ? signumResult / saleTotal * 100 : 0;
    return {
      ...unit,
      technicalPrice: roundMoney(technicalPrice),
      suggestedPrice: roundMoney(suggestedPrice),
      unitPrice: roundMoney(unitPrice),
      quantity: units,
      saleTotal: roundMoney(saleTotal),
      operationCost: roundMoney(operationCost),
      taxes: roundMoney(taxes),
      commission: roundMoney(commission),
      commissionPerUnit: roundMoney(unitPrice * number(policy.commissionRate) / 100),
      signumResult: roundMoney(signumResult),
      marginRate: roundMoney(marginRate),
      profitPerUnit: roundMoney(signumResult / units),
      profitability: signumResult < 0 ? "loss" : marginRate >= 10 ? "green" : marginRate >= 5 ? "yellow" : "red"
    };
  }

  return { calculateUnitCost, calculateQuote };
});
