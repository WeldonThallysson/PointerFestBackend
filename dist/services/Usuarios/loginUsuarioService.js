"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUsuarioService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class LoginUsuarioService {
    execute({ email, senha }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield prisma_1.default.usuarios.findFirst({
                where: {
                    email
                }
            });
            if (!usuarios) {
                throw new Error("Este email já existe !");
            }
            const verificarSenhaCriptografada = yield (0, bcryptjs_1.compare)(senha, usuarios.senha);
            if (!verificarSenhaCriptografada) {
                throw new Error("Sua senha está incorreta");
            }
            const token = (0, jsonwebtoken_1.sign)({
                nome: usuarios.nome,
                senha: usuarios.senha
            }, process.env.JWT_SECRET, {
                subject: usuarios.id,
                expiresIn: "30d"
            });
            return {
                id: usuarios.id,
                email: usuarios.email,
                token: token
            };
        });
    }
}
exports.LoginUsuarioService = LoginUsuarioService;
//# sourceMappingURL=loginUsuarioService.js.map