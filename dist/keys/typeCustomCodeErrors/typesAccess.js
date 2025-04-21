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

// src/keys/typeCustomCodeErrors/typesAccess.ts
var typesAccess_exports = {};
__export(typesAccess_exports, {
  TypesCustomCodeErrors: () => TypesCustomCodeErrors
});
module.exports = __toCommonJS(typesAccess_exports);
var TypesCustomCodeErrors = /* @__PURE__ */ ((TypesCustomCodeErrors2) => {
  TypesCustomCodeErrors2["ADDRESSEMPTY"] = "AddressEmpty";
  TypesCustomCodeErrors2["TERMSPARKEMPTY"] = "TermsParkEmpty";
  return TypesCustomCodeErrors2;
})(TypesCustomCodeErrors || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypesCustomCodeErrors
});
//# sourceMappingURL=typesAccess.js.map