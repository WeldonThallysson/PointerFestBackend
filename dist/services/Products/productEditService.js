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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/services/Products/productEditService.ts
var productEditService_exports = {};
__export(productEditService_exports, {
  ProductsEditService: () => ProductsEditService
});
module.exports = __toCommonJS(productEditService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/utils/validationsServices/validationsProducts.ts
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

// src/services/Products/productEditService.ts
var ProductsEditService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      name,
      allowAddCoupon,
      available,
      description,
      expirationDate,
      idCategory,
      idTypeProduct,
      idUserOwner,
      labelPrice,
      positionOrder,
      price,
      status
    }) {
      const validationsProducts = validationsProductsService({
        name,
        idUserOwner,
        idCategory,
        idTypeProduct,
        description,
        price,
        allowAddCoupon,
        available
      });
      if (validationsProducts) {
        return validationsProducts;
      }
      const productExists = yield prisma_default.products.findFirst({
        where: {
          id
        }
      });
      const categoryExists = yield prisma_default.typesProducts.findFirst({
        where: {
          id: idCategory
        }
      });
      const typesProductsExists = yield prisma_default.typesProducts.findFirst({
        where: {
          id: idTypeProduct
        }
      });
      const userExists = yield prisma_default.typesProducts.findFirst({
        where: {
          id: idUserOwner
        }
      });
      if (!productExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse produto n\xE3o existe"
          }
        };
      }
      if (!categoryExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse categoria n\xE3o existe"
          }
        };
      }
      if (!typesProductsExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse tipo do produto n\xE3o existe"
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse usu\xE1rio n\xE3o existe"
          }
        };
      }
      try {
        yield prisma_default.products.update({
          where: {
            id
          },
          data: {
            name,
            allowAddCoupon: allowAddCoupon !== null ? allowAddCoupon : null,
            available: available !== null ? available : null,
            description,
            expirationDate: expirationDate ? expirationDate : null,
            idCategory,
            idTypeProduct,
            idUserOwner,
            labelPrice,
            positionOrder: positionOrder ? positionOrder : null,
            price: price ? price : null,
            status: status ? status : null
          }
        });
        return {
          data: {
            status: 200,
            message: "Atualiza\xE7\xE3o realizada com sucesso" /* UpdateMessageSuccess */
          }
        };
      } catch (err) {
        return {
          data: {
            status: 500,
            message: `${"Ocorreu um error durante a atualiza\xE7\xE3o" /* UpdateMessageError */} ${err}`
          }
        };
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductsEditService
});
//# sourceMappingURL=productEditService.js.map