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
import { ListagemTodasCategoriasController } from "./controllers/Categorias/listagemTodasCategoriasController";
import { ListagemCategoriasIdController } from "./controllers/Categorias/listagemCategoriasIdController";
import { EditarCategoriasController } from "./controllers/Categorias/editarCategoriasController";
import { DeletarCategoriaController } from "./controllers/Categorias/deletarCategoriasIdController";
import { EditarCidadesController } from "./controllers/Cidades/editarCidadesController";
import { CadastrarEventoController } from "./controllers/Eventos/cadastrarEventoController";
import { ListarTodosEventosController } from "./controllers/Eventos/listarTodosEventosController";
import { ListarEventoIdController } from "./controllers/Eventos/listarEventoIdController";
import multer from "multer";
import uploadConfig from '../src/config/multer';
import { EditarEventoController } from "./controllers/Eventos/editarEventoController";
import { DeletarEventoController } from "./controllers/Eventos/deletarEventoController";

const router = Router()

const upload = multer(uploadConfig.upload("./tmp")) 
//rotas para criar um cadastro, login e detalhes do usuario
router.post('/cadastro', new CadastroUsuarioController().handle)
router.post("/login", new LoginUsuarioController().handle)
router.get("/detalhesUsuario", isLogged, new DetalhesUsuarioController().handle)
router.delete("/deletarUsuario/:id", isLogged, new DeletarUsuariosController().handle)

// rotas para as cidades
router.post("/cidades", isLogged, new CadastroCidadesController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.get("/cidades", isLogged, new ListagemTodasCidadesController().handle)  // essa rota vai ser chamada no Aplicativo front end( usuario)
router.get("/cidades/:id", isLogged, new ListagemCidadesIdController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.put("/cidades", isLogged, new EditarCidadesController().handle); // essa rota vai ser chamada no Aplicativo front end( admin )
router.delete("/cidades/:id", isLogged, new DeletarCidadesIdController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )

// rotas para cadastrar categorias 
router.post("/categorias", isLogged, new CadastroCategoriasController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.get("/categorias", isLogged, new ListagemTodasCategoriasController().handle)  // essa rota vai ser chamada no Aplicativo front end( usuario )
router.get("/categorias/:id", isLogged,new ListagemCategoriasIdController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.put("/categorias", isLogged, new EditarCategoriasController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.delete("/categorias/:id", isLogged, new DeletarCategoriaController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )

// rotas para cadastrar Eventos

router.post("/eventos", isLogged, upload.single('file'), new CadastrarEventoController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario )
router.get("/eventos", isLogged, new ListarTodosEventosController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
router.get("/eventos/:id", isLogged, new ListarEventoIdController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
router.put("/eventos/:id", isLogged, upload.single('file'),  new EditarEventoController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
router.delete("/eventos/:id", isLogged,new DeletarEventoController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)


export {router}