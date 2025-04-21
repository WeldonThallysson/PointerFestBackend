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

// src/keys/typeMethodPayment/typesAccess.ts
var typesAccess_exports = {};
__export(typesAccess_exports, {
  TypesMethodPayment: () => TypesMethodPayment,
  TypesMethodPaymentResponse: () => TypesMethodPaymentResponse,
  validateTypeMethodsPayment: () => validateTypeMethodsPayment
});
module.exports = __toCommonJS(typesAccess_exports);
var TypesMethodPayment = /* @__PURE__ */ ((TypesMethodPayment2) => {
  TypesMethodPayment2["AVISTA"] = "avista";
  TypesMethodPayment2["Pix"] = "pix";
  TypesMethodPayment2["Credit"] = "credito";
  TypesMethodPayment2["Debit"] = "debito";
  return TypesMethodPayment2;
})(TypesMethodPayment || {});
var TypesMethodPaymentResponse = /* @__PURE__ */ ((TypesMethodPaymentResponse2) => {
  TypesMethodPaymentResponse2["AVISTA"] = "AVISTA";
  TypesMethodPaymentResponse2["PIX"] = "PIX";
  TypesMethodPaymentResponse2["CREDIT_CARD"] = "CREDIT_CARD";
  TypesMethodPaymentResponse2["DEBIT_CARD"] = "DEBIT_CARD";
  return TypesMethodPaymentResponse2;
})(TypesMethodPaymentResponse || {});
var validateTypeMethodsPayment = [
  "avista" /* AVISTA */,
  "pix" /* Pix */,
  "debito" /* Debit */,
  "credito" /* Credit */
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypesMethodPayment,
  TypesMethodPaymentResponse,
  validateTypeMethodsPayment
});
//# sourceMappingURL=typesAccess.js.map