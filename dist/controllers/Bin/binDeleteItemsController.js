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

// src/controllers/Bin/binDeleteItemsController.ts
var binDeleteItemsController_exports = {};
__export(binDeleteItemsController_exports, {
  BinDeleteItemsController: () => BinDeleteItemsController
});
module.exports = __toCommonJS(binDeleteItemsController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Bin/binDeleteItemsService.ts
var BinDeleteItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id }) {
      if (!id) {
        return {
          data: {
            message: "Informe o ID do item na lixeira",
            status: 400
          }
        };
      }
      const itemBinExists = yield prisma_default.bin.findUnique({
        where: {
          id
        }
      });
      if (!itemBinExists) {
        return {
          message: "N\xE3o foi poss\xEDvel prosseguir com a a\xE7\xE3o, item n\xE3o encontrado na lixeira",
          status: 404
        };
      }
      try {
        yield prisma_default.bin.delete({
          where: { id }
        });
        return {
          message: "Item deletado permanentemente com sucesso",
          status: 200
        };
      } catch (err) {
        return {
          message: `${"Ocorreu um error durante a exclus\xE3o" /* DeleteMessageError */} ${err}`,
          status: 500
        };
      }
    });
  }
};

// src/controllers/Bin/binDeleteItemsController.ts
var BinDeleteItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        id
      } = req.params;
      const binDeleteItemsService = new BinDeleteItemsService();
      const responseBinGetAllItemsService = yield binDeleteItemsService.execute({
        id
      });
      return res.status(responseBinGetAllItemsService.data.status).json(responseBinGetAllItemsService.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BinDeleteItemsController
});
//# sourceMappingURL=binDeleteItemsController.js.map