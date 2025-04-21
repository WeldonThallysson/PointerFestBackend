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

// src/utils/validators/validatorAge.ts
var validatorAge_exports = {};
__export(validatorAge_exports, {
  validatorAge: () => validatorAge
});
module.exports = __toCommonJS(validatorAge_exports);
var validatorAge = (birthDate) => {
  const today = /* @__PURE__ */ new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birth.getDate()) {
    age--;
  }
  return age < 18;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validatorAge
});
//# sourceMappingURL=validatorAge.js.map