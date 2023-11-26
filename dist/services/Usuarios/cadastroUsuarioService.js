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
exports.CadastroUsuarioService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class CadastroUsuarioService {
    execute({ nome, email, senha }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new Error("O Email não foi enviado");
            }
            const verificaEmailsExistentes = yield prisma_1.default.usuarios.findFirst({
                where: {
                    email: email
                }
            });
            if (verificaEmailsExistentes) {
                throw new Error("Este email já existe");
            }
            const senhaHash = yield (0, bcryptjs_1.hash)(senha, 8);
            const usuarios = yield prisma_1.default.usuarios.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: senhaHash,
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    update_At: true,
                    created_At: true
                }
            });
            return usuarios;
        });
    }
}
exports.CadastroUsuarioService = CadastroUsuarioService;
//# sourceMappingURL=cadastroUsuarioService.js.map