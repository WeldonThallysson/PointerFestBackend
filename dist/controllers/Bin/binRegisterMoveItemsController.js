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

// src/controllers/Bin/binRegisterMoveItemsController.ts
var binRegisterMoveItemsController_exports = {};
__export(binRegisterMoveItemsController_exports, {
  BinRegisterMoveItemsController: () => BinRegisterMoveItemsController
});
module.exports = __toCommonJS(binRegisterMoveItemsController_exports);

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

// src/controllers/Bin/binRegisterMoveItemsController.ts
var BinRegisterMoveItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const idUserLogged = req.user_id;
      const {
        id,
        tableName
      } = req.body;
      const binRegisterMoveItems = new BinRegisterMoveItemsService();
      const responseBinRegisterMoveItems = yield binRegisterMoveItems.execute({
        id,
        idUserOwner: idUserLogged,
        tableName
      });
      return res.status(responseBinRegisterMoveItems.data.status).json(responseBinRegisterMoveItems.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BinRegisterMoveItemsController
});
//# sourceMappingURL=binRegisterMoveItemsController.js.map