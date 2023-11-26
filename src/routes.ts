import {Router,Request,Response} from "express";
import { CadastroUsuarioController } from "./controllers/Usuarios/cadastroUsuarioController";
import { LoginUsuarioController } from "./controllers/Usuarios/loginUsuarioController";
import { DetalhesUsuarioController } from "./controllers/Usuarios/detalhesUsuariosController";
import { CadastroCidadesController } from "./controllers/Cidades/cadastroCidadesController";
import { ListagemTodasCidadesController } from "./controllers/Cidades/listagemTodasCidadesController";
import { ListagemCidadesIdController } from "./controllers/Cidades/listagemCidadesIdController";
import { DeletarCidadesIdController } from "./controllers/Cidades/deletarCidadesIdController";
import { isLogged } from "./middlewares/isLogged";
import { DeletarUsuariosController } from "./controllers/Usuarios/deletarUsuarioServiceController";
import { CadastroCategoriasController } from "./controllers/Categorias/cadastroCategoriasController";

const router = Router()

//rotas para criar um cadastro, login e detalhes do usuario
router.post('/cadastro', new CadastroUsuarioController().handle)
router.post("/login", new LoginUsuarioController().handle)
router.get("/detalhesUsuario", isLogged, new DetalhesUsuarioController().handle)
router.delete("/deletarUsuario/:id", isLogged, new DeletarUsuariosController().handle)

// rotas para as cidades
router.post("/cidades", isLogged, new CadastroCidadesController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.get("/cidades", isLogged, new ListagemTodasCidadesController().handle)  // essa rota vai ser chamada no Aplicativo front end( usuario)
router.get("/cidades/:id", isLogged, new ListagemCidadesIdController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
// router.put("/cidades", isLogged, new AlterarCidadesController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.delete("/cidades/:id", isLogged, new DeletarCidadesIdController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )

// rotas para cadastrar categorias 

router.post("/categorias", isLogged, new CadastroCategoriasController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
// router.get("/categorias", isLogged, new ListagemTodasCategoriasController().handle)  // essa rota vai ser chamada no Aplicativo front end( usuario )
// router.get("/categorias/:id", isLogged,new ListagemCategoriasIdController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
// router.put("/categorias/:id", isLogged, new EditarCategoriasController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
// router.delete("/categorias/:id", isLogged, new DeletarCategoriaController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )

// rotas para cadastrar Eventos

// router.post("/evento", isLogged, upload.single('file'), new CadastroEvento().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
// router.get("/eventos", isLogged, new ListagemTodosEventosController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
// router.get("/evento/:id", isLogged, new ListagemEventoIdController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
// router.put("/evento/:id", isLogged, new EditarEventoController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
// router.delete("/evento/:id, isLogged,new DeletarEventoController().handle")   // essa rota vai ser chamada no Aplicativo front end( usuario)


export {router}