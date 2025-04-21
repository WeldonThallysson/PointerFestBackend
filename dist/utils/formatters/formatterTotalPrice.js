var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/formatters/formatterTotalPrice.ts
var formatterTotalPrice_exports = {};
__export(formatterTotalPrice_exports, {
  formatterTotalPrice: () => formatterTotalPrice,
  formatterTotalSomePrice: () => formatterTotalSomePrice
});
module.exports = __toCommonJS(formatterTotalPrice_exports);
var formatterTotalPrice = (items) => {
  const total = items.reduce((prev, current) => {
    const totalPrice = current.discount ? current.isPercentage ? current.quantity * current.price - current.discount / 100 * (current.quantity * current.price) : current.quantity * current.price - current.discount : current.quantity * current.price;
    return prev + totalPrice;
  }, 0);
  return total;
};
var formatterTotalSomePrice = (item) => {
  const total = item.reduce((prev, current) => prev + current.price * current.quantity, 0);
  return total;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatterTotalPrice,
  formatterTotalSomePrice
});
//# sourceMappingURL=formatterTotalPrice.js.map