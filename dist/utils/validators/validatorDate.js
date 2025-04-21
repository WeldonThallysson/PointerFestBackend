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

// src/utils/validators/validatorDate.ts
var validatorDate_exports = {};
__export(validatorDate_exports, {
  validateBirthDate: () => validateBirthDate
});
module.exports = __toCommonJS(validatorDate_exports);
var import_date_fns = require("date-fns");
var validateBirthDate = (dateString) => {
  const date = (0, import_date_fns.parseISO)(dateString);
  return (0, import_date_fns.isValid)(date);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validateBirthDate
});
//# sourceMappingURL=validatorDate.js.map