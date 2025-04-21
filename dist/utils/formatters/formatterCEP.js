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

// src/utils/formatters/formatterCEP.ts
var formatterCEP_exports = {};
__export(formatterCEP_exports, {
  formatterCEP: () => formatterCEP
});
module.exports = __toCommonJS(formatterCEP_exports);
var formatterCEP = (cep) => {
  if (cep) {
    const cleanedCEP = cep.replace(/\D/g, "");
    const formattedCEP = cleanedCEP.replace(/(\d{5})(\d{3})/, "$1-$2");
    return formattedCEP;
  }
  return null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatterCEP
});
//# sourceMappingURL=formatterCEP.js.map