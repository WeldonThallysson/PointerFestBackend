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

// src/utils/validationsServices/validationsProducts.ts
var validationsProducts_exports = {};
__export(validationsProducts_exports, {
  validationsProductsService: () => validationsProductsService
});
module.exports = __toCommonJS(validationsProducts_exports);
var validationsProductsService = ({
  name,
  idUserOwner,
  description,
  allowAddCoupon,
  available,
  idCategory,
  idTypeProduct,
  price
}) => {
  if (!idUserOwner) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe o id do usu\xE1rio respons\xE1vel",
        status: 400
      }
    };
  }
  if (!idCategory) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe a categoria do produto",
        status: 400
      }
    };
  }
  if (!idTypeProduct) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe o tipo do produto",
        status: 400
      }
    };
  }
  if (available === null) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe se o produto est\xE1 dispon\xEDvel para venda",
        status: 400
      }
    };
  }
  if (allowAddCoupon === null) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe se pode haver uso de cupom para os produtos",
        status: 400
      }
    };
  }
  if (!name) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha o nome do produto.",
        status: 400
      }
    };
  }
  if (!description) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor informe a descri\xE7\xE3o do produto",
        status: 400
      }
    };
  }
  if (!price) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor informe pre\xE7o do produto",
        status: 400
      }
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validationsProductsService
});
//# sourceMappingURL=validationsProducts.js.map