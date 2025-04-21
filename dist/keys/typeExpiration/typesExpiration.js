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

// src/keys/typeExpiration/typesExpiration.ts
var typesExpiration_exports = {};
__export(typesExpiration_exports, {
  TypesExpiration: () => TypesExpiration
});
module.exports = __toCommonJS(typesExpiration_exports);
var TypesExpiration = /* @__PURE__ */ ((TypesExpiration2) => {
  TypesExpiration2["ExpirationAutomatic"] = "expirationAutomatic";
  TypesExpiration2["ExpirationByDate"] = "expirationByDate";
  return TypesExpiration2;
})(TypesExpiration || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypesExpiration
});
//# sourceMappingURL=typesExpiration.js.map