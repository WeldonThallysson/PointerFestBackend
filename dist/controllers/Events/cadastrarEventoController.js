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

// src/controllers/Events/cadastrarEventoController.ts
var cadastrarEventoController_exports = {};
__export(cadastrarEventoController_exports, {
  CadastrarEventoController: () => CadastrarEventoController
});
module.exports = __toCommonJS(cadastrarEventoController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Events/cadastrarEventoService.ts
var CadastrarEventoService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      idUserOwner,
      idProduct,
      idCategory,
      name,
      description,
      localityEvent,
      urlLocalityEvent,
      bannerImageUrl,
      dateEvent,
      hourEvent,
      restrictionsEvent,
      placesPurchaseTicket,
      urlPostSocialNetwork,
      phoneForContact
    }) {
      const eventoExiste = yield prisma_default.events.findFirst({
        where: {
          name
        }
      });
      if (eventoExiste) {
        return {
          message: "Essa evento j\xE1 existe",
          status: 400
        };
      }
      const cadastrarEvento = yield prisma_default.events.create({
        data: {
          idUserOwner,
          name,
          description,
          idProduct,
          idCategory,
          localityEvent,
          urlLocalityEvent,
          bannerImageUrl,
          dateEvent,
          hourEvent,
          restrictionsEvent,
          placesPurchaseTicket,
          urlPostSocialNetwork,
          phoneForContact
        }
      });
      return cadastrarEvento;
    });
  }
};

// src/controllers/Events/cadastrarEventoController.ts
var import_cloudinary = require("cloudinary");
import_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
var CadastrarEventoController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.url;
      const {
        idProduct,
        idCategory,
        name,
        description,
        localityEvent,
        urlLocalityEvent,
        bannerImageUrl,
        dateEvent,
        hourEvent,
        restrictionsEvent,
        placesPurchaseTicket,
        urlPostSocialNetwork,
        phoneForContact
      } = req.body;
      const cadastrarEvento = new CadastrarEventoService();
      const file = req.files["bannerEvento"];
      if (Array.isArray(file)) {
        throw new Error("Only one file is allowed for 'bannerEvento'");
      } else {
        const resultFile = yield new Promise((resolve, reject) => {
          import_cloudinary.v2.uploader.upload_stream({}, (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          }).end(file.data);
        });
        const eventoCadastrado = yield cadastrarEvento.execute({
          idUserOwner: id_user_logged,
          idProduct,
          idCategory,
          name,
          description,
          localityEvent,
          urlLocalityEvent,
          bannerImageUrl,
          dateEvent,
          hourEvent,
          restrictionsEvent,
          placesPurchaseTicket,
          urlPostSocialNetwork,
          phoneForContact
        });
        if (eventoCadastrado.status === 403) {
          return res.status(403).json(eventoCadastrado);
        }
        return res.json(eventoCadastrado);
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CadastrarEventoController
});
//# sourceMappingURL=cadastrarEventoController.js.map