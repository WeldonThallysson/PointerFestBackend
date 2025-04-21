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

// src/utils/formatters/formatterPrice.ts
var formatterPrice_exports = {};
__export(formatterPrice_exports, {
  formatterCurrency: () => formatterCurrency,
  formatterPrice: () => formatterPrice
});
module.exports = __toCommonJS(formatterPrice_exports);
var formatterPrice = (value) => {
  if (value) {
    const priceFormated = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
    return priceFormated;
  }
};
var formatterCurrency = (value) => {
  if (value !== null && value !== void 0) {
    const currency = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value / 100);
    return currency;
  }
  return "R$ 0,00";
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatterCurrency,
  formatterPrice
});
//# sourceMappingURL=formatterPrice.js.map