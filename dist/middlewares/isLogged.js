"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogged = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function isLogged(req, res, next) {
    const loggedToken = req.headers.authorization;
    if (!loggedToken) {
        return res.status(401).end();
    }
    const [, token] = loggedToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.usuario_id = sub;
        console.log("-middleware de verificação de token concluido");
    }
    catch (err) {
        res.status(401).end();
    }
    return next();
}
exports.isLogged = isLogged;
//# sourceMappingURL=isLogged.js.map