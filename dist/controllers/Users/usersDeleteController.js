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

// src/controllers/Users/usersDeleteController.ts
var usersDeleteController_exports = {};
__export(usersDeleteController_exports, {
  UsersDeleteController: () => UsersDeleteController
});
module.exports = __toCommonJS(usersDeleteController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/utils/validators/validatorPermissions.ts
var validatorPermissions = ({ typeAccess }) => {
  return typeAccess === "owner" /* Owner */ || typeAccess === "developer" /* Developer */ || typeAccess === "master" /* Master */ || typeAccess === "admin" /* Admin */;
};

// src/services/Users/usersDeleteService.ts
var UsersDeleteService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id, id_user_logged }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, por favor informe o (id) do usu\xE1rio.",
            status: 400
          }
        };
      }
      const userExistsLogged = yield prisma_default.users.findFirst({
        where: {
          id: id_user_logged
        }
      });
      const userExists = yield prisma_default.users.findFirst({
        where: { id }
      });
      const responsePermission = validatorPermissions({
        typeAccess: userExistsLogged.typeAccess
      });
      if (!responsePermission) {
        return {
          data: {
            message: "Sua conta n\xE3o possui permiss\xE3o para realizar esta a\xE7\xE3o.",
            status: 403
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel deletar, o usu\xE1rio n\xE3o existe.",
            status: 404
          }
        };
      }
      if (userExists.id === id_user_logged && userExistsLogged.typeAccess === "admin" /* Admin */) {
        return {
          data: {
            message: "N\xE3o \xE9 poss\xEDvel como administrador deletar a pr\xF3pria conta, est\xE1 a\xE7\xE3o est\xE1 dispon\xEDvel somente para contas master",
            status: 403
          }
        };
      }
      yield prisma_default.$transaction((tx) => __async(this, null, function* () {
        if (userExists.typeAccess === "promoter" /* Promoter */) {
          yield tx.coupon.updateMany({
            where: { idPromoter: id },
            data: { idPromoter: null, commissionPromoter: null }
          });
        }
        yield tx.couponUsage.deleteMany({ where: { idUserOwner: id } });
        yield tx.coupon.deleteMany({
          where: { idUserOwner: id }
        });
        yield tx.couponUsage.deleteMany({ where: { idUserOwner: id } });
        yield tx.events.deleteMany({ where: { idUserOwner: id } });
        yield tx.methodsPayments.deleteMany({ where: { idUserOwner: id } });
        yield tx.typesCommercials.deleteMany({ where: { idUserOwner: id } });
        yield tx.typesProducts.deleteMany({ where: { idUserOwner: id } });
        yield tx.users.delete({ where: { id } });
        yield tx.categories.deleteMany({ where: { idUserOwner: id } });
        yield tx.commercials.deleteMany({ where: { idUserOwner: id } });
        yield tx.purchases.deleteMany({ where: { idUser: id } });
        yield tx.bin.deleteMany({ where: { idUserOwner: id } });
      }));
      return {
        data: {
          message: "Usu\xE1rio deletado com sucesso!",
          status: 200
        }
      };
    });
  }
};

// src/controllers/Users/usersDeleteController.ts
var UsersDeleteController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      const id_user_logged = req.user_id;
      const usersDelete = new UsersDeleteService();
      const responseUsersDelete = yield usersDelete.execute({
        id,
        id_user_logged
      });
      return res.json(responseUsersDelete);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsersDeleteController
});
//# sourceMappingURL=usersDeleteController.js.map