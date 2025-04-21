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

// src/utils/formatters/formatterCPF.ts
var formatterCPF_exports = {};
__export(formatterCPF_exports, {
  formatterCPF: () => formatterCPF
});
module.exports = __toCommonJS(formatterCPF_exports);
var formatterCPF = (cpf) => {
  const cleanedCPF = cpf.replace(/\D/g, "");
  const formattedCPF = cleanedCPF.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return formattedCPF;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatterCPF
});
//# sourceMappingURL=formatterCPF.js.map