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

// src/utils/validators/validatorPhone.ts
var validatorPhone_exports = {};
__export(validatorPhone_exports, {
  isValidPhoneNumber: () => isValidPhoneNumber
});
module.exports = __toCommonJS(validatorPhone_exports);
var isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(\d{1,3})(\d{1,4})(\d{6,10})$/;
  const match = phoneRegex.exec(phoneNumber);
  if (!match) return false;
  const countryCode = match[1];
  const areaCode = match[2];
  const number = match[3];
  if (countryCode === "55") {
    const isValidBrazilAreaCode = areaCode.length >= 2 && areaCode.length <= 4;
    const isValidBrazilNumber = number.length >= 8 && number.length <= 9;
    return isValidBrazilAreaCode && isValidBrazilNumber;
  } else {
    const isValidAreaCode = areaCode.length >= 1 && areaCode.length <= 4;
    const isValidNumber = number.length >= 6 && number.length <= 10;
    return isValidAreaCode && isValidNumber;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValidPhoneNumber
});
//# sourceMappingURL=validatorPhone.js.map