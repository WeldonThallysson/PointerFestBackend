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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalhesUsuarioController = void 0;
const detalhesUsuarioService_1 = require("../../services/Usuarios/detalhesUsuarioService");
class DetalhesUsuarioController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario_id = req.usuario_id;
            const detalhesUsuario = new detalhesUsuarioService_1.DetalhesUsuarioServices();
            const detalhes = yield detalhesUsuario.execute({ usuario_id });
            return res.json(detalhes);
        });
    }
}
exports.DetalhesUsuarioController = DetalhesUsuarioController;
//# sourceMappingURL=detalhesUsuariosController.js.map