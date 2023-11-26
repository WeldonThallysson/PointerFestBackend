"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cadastroUsuarioController_1 = require("./controllers/Usuarios/cadastroUsuarioController");
const loginUsuarioController_1 = require("./controllers/Usuarios/loginUsuarioController");
const detalhesUsuariosController_1 = require("./controllers/Usuarios/detalhesUsuariosController");
const cadastroCidadesController_1 = require("./controllers/Cidades/cadastroCidadesController");
const listagemTodasCidadesController_1 = require("./controllers/Cidades/listagemTodasCidadesController");
const isLogged_1 = require("./middlewares/isLogged");
const router = (0, express_1.Router)();
exports.router = router;
//rotas para criar um cadastro, login e detalhes do usuario
router.get("/", new listagemTodasCidadesController_1.ListagemTodasCidadesController().handle);
router.post('/cadastro', new cadastroUsuarioController_1.CadastroUsuarioController().handle);
router.post("/login", new loginUsuarioController_1.LoginUsuarioController().handle);
router.get("/detalhesUsuario", isLogged_1.isLogged, new detalhesUsuariosController_1.DetalhesUsuarioController().handle);
// rotas para cadastrar as cidades
router.post("/cidades", isLogged_1.isLogged, new cadastroCidadesController_1.CadastroCidadesController().handle); // essa rota vai ser chamada no Aplicativo front end( admin )
router.get("/cidades", isLogged_1.isLogged, new listagemTodasCidadesController_1.ListagemTodasCidadesController().handle); // essa rota vai ser chamada no Aplicativo front end( usuario)
//# sourceMappingURL=routes.js.map