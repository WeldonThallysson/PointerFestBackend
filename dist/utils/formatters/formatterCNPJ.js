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

// src/utils/formatters/formatterCNPJ.ts
var formatterCNPJ_exports = {};
__export(formatterCNPJ_exports, {
  formatterCNPJ: () => formatterCNPJ
});
module.exports = __toCommonJS(formatterCNPJ_exports);
var formatterCNPJ = (cnpj) => {
  const cleanedCNPJ = cnpj.replace(/\D/g, "");
  const formattedCNPJ = cleanedCNPJ.replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d{2})$/, "$1-$2");
  return formattedCNPJ;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatterCNPJ
});
//# sourceMappingURL=formatterCNPJ.js.map