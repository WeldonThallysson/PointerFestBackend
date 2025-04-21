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

// src/keys/typeAccess/typesAccess.ts
var typesAccess_exports = {};
__export(typesAccess_exports, {
  TypesAccess: () => TypesAccess
});
module.exports = __toCommonJS(typesAccess_exports);
var TypesAccess = /* @__PURE__ */ ((TypesAccess2) => {
  TypesAccess2["Owner"] = "owner";
  TypesAccess2["Developer"] = "developer";
  TypesAccess2["Master"] = "master";
  TypesAccess2["Admin"] = "admin";
  TypesAccess2["Promoter"] = "promoter";
  TypesAccess2["Worker"] = "worker";
  TypesAccess2["User"] = "client";
  return TypesAccess2;
})(TypesAccess || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypesAccess
});
//# sourceMappingURL=typesAccess.js.map