"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            err: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: "internal error server"
    });
}); // esse middleware serve para enviar todos os erros de uma forma amigavel e bonita.
app.use(routes_1.router);
app.listen(3333, () => {
    console.log("servidor online");
});
//# sourceMappingURL=server.js.map