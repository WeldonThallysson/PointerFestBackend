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

// src/controllers/Products/productDeleteController.ts
var productDeleteController_exports = {};
__export(productDeleteController_exports, {
  ProductsDeleteController: () => ProductsDeleteController
});
module.exports = __toCommonJS(productDeleteController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Bin/binRegisterMoveItemsService.ts
var BinRegisterMoveItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id, idUserOwner, tableName }) {
      if (!idUserOwner) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, Informe o ID do respons\xE1vel",
            status: 400
          }
        };
      }
      if (!id || !tableName) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, Informe o ID e o nome da tabela",
            status: 400
          }
        };
      }
      const item = yield prisma_default.$queryRawUnsafe(`SELECT * FROM ${tableName} WHERE id = '${id}'`);
      try {
        yield prisma_default.bin.create({
          data: {
            tableName,
            itemId: id,
            idUserOwner,
            data: JSON.stringify(item)
          }
        });
        yield prisma_default.$executeRawUnsafe(`DELETE FROM ${tableName} WHERE id = '${id}'`);
        return {
          data: {
            message: `Item movido para a lixeira com sucesso`,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: `Ocorreu um erro ao mover item para a lixeira ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/services/Products/productsDeleteService.ts
var ProductsDeleteService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserOwner
    }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor envio o id do comercial para prosseguir",
            status: 403
          }
        };
      }
      if (!idUserOwner) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor envie o id do respons\xE1vel",
            status: 403
          }
        };
      }
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      const commercialsExists = yield prisma_default.products.findFirst({
        where: {
          id,
          idUserOwner
        }
      });
      if (!commercialsExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, este produto n\xE3o existe",
            status: 403
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, est\xE1 usu\xE1rio respons\xE1vel n\xE3o existe",
            status: 403
          }
        };
      }
      try {
        const binRegisterItemsService = new BinRegisterMoveItemsService();
        const responseDelete = yield binRegisterItemsService.execute({
          id,
          tableName: "commercials",
          idUserOwner: commercialsExists.idUserOwner
        });
        return {
          data: {
            message: responseDelete.data.message,
            status: responseDelete.data.status
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a exclus\xE3o" /* DeleteMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Products/productDeleteController.ts
var ProductsDeleteController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      const idUserOwner = req.user_id;
      const productsDelete = new ProductsDeleteService();
      const responseProductsDelete = yield productsDelete.execute({ id, idUserOwner });
      return res.status(responseProductsDelete.data.status).json(responseProductsDelete.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductsDeleteController
});
//# sourceMappingURL=productDeleteController.js.map