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

// src/controllers/Bin/binEditItemsController.ts
var binEditItemsController_exports = {};
__export(binEditItemsController_exports, {
  BinEditItemsController: () => BinEditItemsController
});
module.exports = __toCommonJS(binEditItemsController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Bin/binEditItemsService.ts
var BinEditItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id, idUserOwner, tableName, data }) {
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
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      const itemBinExists = yield prisma_default.$queryRawUnsafe(
        `SELECT * FROM ${tableName} WHERE id = '${id}'`
      );
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, usu\xE1rio n\xE3o existe",
            status: 400
          }
        };
      }
      if (!itemBinExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, item n\xE3o existe na lixeira",
            status: 400
          }
        };
      }
      try {
        yield prisma_default.bin.update({
          where: {
            id
          },
          data: {
            tableName,
            itemId: id,
            idUserOwner,
            data: JSON.stringify(data)
          }
        });
        return {
          data: {
            message: "Atualiza\xE7\xE3o realizada com sucesso" /* UpdateMessageSuccess */,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a atualiza\xE7\xE3o" /* UpdateMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Bin/binEditItemsController.ts
var BinEditItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        id,
        idUserOwner,
        tableName,
        data
      } = req.body;
      const binEditItemsService = new BinEditItemsService();
      const responseBinGetAllItemsService = yield binEditItemsService.execute({
        id,
        idUserOwner,
        tableName,
        data
      });
      return res.status(responseBinGetAllItemsService.data.status).json(responseBinGetAllItemsService.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BinEditItemsController
});
//# sourceMappingURL=binEditItemsController.js.map