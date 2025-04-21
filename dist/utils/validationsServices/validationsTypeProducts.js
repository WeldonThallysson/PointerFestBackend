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

// src/utils/validationsServices/validationsTypeProducts.ts
var validationsTypeProducts_exports = {};
__export(validationsTypeProducts_exports, {
  validationsTypeProductsService: () => validationsTypeProductsService
});
module.exports = __toCommonJS(validationsTypeProducts_exports);
var validationsTypeProductsService = ({
  name,
  idUserOwner,
  position
}) => {
  if (!idUserOwner) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe o id do usu\xE1rio respons\xE1vel",
        status: 400
      }
    };
  }
  if (!name) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha o nome do tipo do produto.",
        status: 400
      }
    };
  }
  if (!position) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor informe a posi\xE7\xE3o do tipo do produto",
        status: 400
      }
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validationsTypeProductsService
});
//# sourceMappingURL=validationsTypeProducts.js.map