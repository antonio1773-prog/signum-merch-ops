const assert = require("node:assert/strict");
const { calculateQuote } = require("./pricing-engine.js");

const config = {
  costs: { paper: 92.26, ink: 93.85, tape: 25.11, labor: 320, printerDepreciation: 45.52, pressDepreciation: 41.43, electricity: 10 },
  policy: { wasteRate: 3, taxRate: 2, commissionRate: 20, targetMarginRate: 10, roundingMultiple: 50 }
};
const result = calculateQuote({ purchaseCost: 262.10 }, config, 100, "");

assert.equal(result.subtotal, 880.27);
assert.equal(result.costWithWaste, 907.49);
assert.equal(result.unitCost, 917.49);
assert.equal(result.technicalPrice, 1349.26);
assert.equal(result.suggestedPrice, 1350);
assert.equal(result.saleTotal, 135000);
assert.equal(result.commission, 27000);
console.log("Cotizador OK: caso 40x30x10 verificado.");
