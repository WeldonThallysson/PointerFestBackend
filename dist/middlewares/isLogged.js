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

// src/middlewares/isLogged.ts
var isLogged_exports = {};
__export(isLogged_exports, {
  isLogged: () => isLogged
});
module.exports = __toCommonJS(isLogged_exports);
var import_jsonwebtoken = require("jsonwebtoken");
var isLogged = (req, res, next) => {
  const loggedToken = req.headers.authorization;
  if (!loggedToken) {
    return res.status(401).json({
      status: 401,
      message: "Solicita\xE7\xE3o necessita do token de autentica\xE7\xE3o, fa\xE7a o login."
    }).end();
  }
  const [, token] = loggedToken.split(" ");
  try {
    const { sub } = (0, import_jsonwebtoken.verify)(token, process.env.JWT_SECRET);
    req.user_id = sub;
    console.log("Verifica\xE7\xE3o de token conclu\xEDda");
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Solicita\xE7\xE3o falhou, ocorreu algum erro na verifica\xE7\xE3o do token."
    }).end();
  }
  return next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isLogged
});
//# sourceMappingURL=isLogged.js.map