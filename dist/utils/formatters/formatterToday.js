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

// src/utils/formatters/formatterToday.ts
var formatterToday_exports = {};
__export(formatterToday_exports, {
  todayFormatted: () => todayFormatted,
  todayFormattedWithTime: () => todayFormattedWithTime,
  todayFormattedWithTimeToIso: () => todayFormattedWithTimeToIso,
  todayWithTime: () => todayWithTime,
  todayWithTimeAtFormat: () => todayWithTimeAtFormat
});
module.exports = __toCommonJS(formatterToday_exports);
var import_luxon = require("luxon");
var today = /* @__PURE__ */ new Date();
var todayFormatted = new Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "America/Sao_Paulo"
  // Garante o horário do Brasil
}).format(today).split("/").reverse().join("-");
var todayFormattedWithTime = (dateNow) => {
  new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    // Inclui as horas no formato de 2 dígitos
    minute: "2-digit",
    // Inclui os minutos no formato de 2 dígitos
    timeZone: "America/Sao_Paulo"
    // Garante o horário do Brasil
  }).format(dateNow).replace(",", "");
};
var todayFormattedWithTimeToIso = (dateNow) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
    hour12: false
    // Para garantir o formato 24h
  };
  const formatted = new Intl.DateTimeFormat("pt-BR", options).format(dateNow).replace(",", "");
  const [date, time] = formatted.split(" ");
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day} ${time}`;
};
var todayWithTime = () => {
  const now = import_luxon.DateTime.now().setZone("America/Sao_Paulo");
  return now.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
};
var todayWithTimeAtFormat = (date) => {
  if (!date) {
    return "";
  }
  const isoString = date instanceof Date ? date.toISOString() : date;
  const [datePart, timePart] = isoString.split("T");
  const [year, month, day] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  todayFormatted,
  todayFormattedWithTime,
  todayFormattedWithTimeToIso,
  todayWithTime,
  todayWithTimeAtFormat
});
//# sourceMappingURL=formatterToday.js.map