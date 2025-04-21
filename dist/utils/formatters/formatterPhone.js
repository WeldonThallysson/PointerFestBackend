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

// src/utils/formatters/formatterPhone.ts
var formatterPhone_exports = {};
__export(formatterPhone_exports, {
  formatPhoneNumber: () => formatPhoneNumber,
  separatePhoneNumber: () => separatePhoneNumber
});
module.exports = __toCommonJS(formatterPhone_exports);
var separatePhoneNumber = (phone) => {
  const cleanedPhone = phone.replace(/\D/g, "");
  const regex = /^(\d{1,3})(\d{2})(\d{9,})$/;
  const match = cleanedPhone.match(regex);
  if (!match) {
    throw new Error("N\xFAmero de telefone inv\xE1lido.");
  }
  const [, country, area, number] = match;
  return {
    country,
    // Código do país (1-3 dígitos)
    area,
    // DDD (2 dígitos)
    number
    // Número de telefone (9 ou mais dígitos)
  };
};
var formatPhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return phone;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatPhoneNumber,
  separatePhoneNumber
});
//# sourceMappingURL=formatterPhone.js.map