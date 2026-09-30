(function (root, factory) {
  const engine = factory();
  if (typeof module === "object" && module.exports) module.exports = engine;
  root.SignumPricing = engine;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const number = (value) => Number(value || 0);
  const roundMoney = (value) => Math.round((number(value) + Number.EPSILON) * 100) / 100;

  function calculateUnitCost(variant, config) {
    const costs = config.costs;
    const subtotal =
      number(variant.purchaseCost) +
      number(costs.paper) +
      number(costs.ink) +
      number(costs.tape) +
      number(costs.labor) +
      number(costs.printerDepreciation) +
      number(costs.pressDepreciation);
    const wasteRate = number(config.policy.wasteRate) / 100;
    const costWithWaste = subtotal / (1 - wasteRate);
    const wasteAmount = costWithWaste - subtotal;
    const unitCost = costWithWaste + number(costs.electricity);
    return {
      subtotal: roundMoney(subtotal),
      costWithWaste: roundMoney(costWithWaste),
      wasteAmount: roundMoney(wasteAmount),
      unitCost: roundMoney(unitCost),
      unitCostRaw: unitCost
    };
  }

  function calculateQuote(variant, config, quantity, offeredUnitPrice) {
    const unit = calculateUnitCost(variant, config);
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
