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

// src/utils/formatters/formatterDate.ts
var formatterDate_exports = {};
__export(formatterDate_exports, {
  formatterDate: () => formatterDate,
  formatterDateToIso: () => formatterDateToIso,
  formatterDateToString: () => formatterDateToString
});
module.exports = __toCommonJS(formatterDate_exports);
var import_date_fns = require("date-fns");
var formatterDate = (date) => {
  const formattedBirthDate = (0, import_date_fns.parseISO)(date);
  return formattedBirthDate;
};
var formatterDateToIso = (date) => {
  const dateObject = typeof date === "string" ? (0, import_date_fns.parseISO)(date) : date;
  const formattedBirthDate = (0, import_date_fns.format)(dateObject, "yyyy-MM-dd");
  return formattedBirthDate;
};
var formatterDateToString = (item) => {
  if (item) {
    const [year, month, day] = item.split("-");
    return `${day}/${month}/${year}`;
  }
  return null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatterDate,
  formatterDateToIso,
  formatterDateToString
});
//# sourceMappingURL=formatterDate.js.map