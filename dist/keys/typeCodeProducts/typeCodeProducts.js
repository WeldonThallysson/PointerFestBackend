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

// src/keys/typeCodeProducts/typeCodeProducts.ts
var typeCodeProducts_exports = {};
__export(typeCodeProducts_exports, {
  TypesCodeProducts: () => TypesCodeProducts
});
module.exports = __toCommonJS(typeCodeProducts_exports);
var TypesCodeProducts = /* @__PURE__ */ ((TypesCodeProducts2) => {
  TypesCodeProducts2["PASSPORT_ADULT"] = "2df6622e-938e-47b6-a2fe-731938a42b5f";
  TypesCodeProducts2["PASSPORT_KIDS"] = "ba7124da-d5a9-49ff-8d7a-2b5bc75c1e94";
  return TypesCodeProducts2;
})(TypesCodeProducts || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypesCodeProducts
});
//# sourceMappingURL=typeCodeProducts.js.map