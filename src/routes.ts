import { Router,Request,Response } from "express";

import { UsersRegisterController } from "./controllers/Users/Auth/usersRegisterController";  
import { UsersLoginController } from "./controllers/Users/Auth/usersLoginController"; 

import { UsersDetailsController } from "./controllers/Users/usersDetailsController";
 
import { isLogged } from "./middlewares/isLogged";
import { UsersDeleteController } from "./controllers/Users/usersDeleteController";
import { CadastroCategoriasController } from "./controllers/Categories/cadastroCategoriasController";
import { ListagemTodasCategoriasController } from "./controllers/Categories/listagemTodasCategoriasController";
import { ListagemCategoriasIdController } from "./controllers/Categories/listagemCategoriasIdController";
import { EditarCategoriasController } from "./controllers/Categories/editarCategoriasController";
import { DeletarCategoriaController } from "./controllers/Categories/deletarCategoriasIdController";
 
import { CadastrarEventoController } from "./controllers/Events/cadastrarEventoController";
import { ListarTodosEventosController } from "./controllers/Events/listarTodosEventosController";
import { ListarEventoIdController } from "./controllers/Events/listarEventoIdController";
import multer from "multer";
import uploadConfig from '../src/config/multer';
import { EditarEventoController } from "./controllers/Events/editarEventoController";
import { DeletarEventoController } from "./controllers/Events/deletarEventoController";
import { UsersEditController } from "./controllers/Users/usersEditController";
import { UsersGetAllController } from "./controllers/Users/usersGetAllController";
import { CadastroProdutoController } from "./controllers/Products/cadastroProdutosController";

import { ListarProdutosController } from "./controllers/Products/listarProdutosController";
import { DeletarProdutosController } from "./controllers/Products/deletarProdutoController";
import { ListarDetalhesProdutosController } from "./controllers/Products/listarDetalhesProdutosController";
import { EditarProdutosController } from "./controllers/Products/editarProdutosController";

const router = Router()

const upload = multer(uploadConfig.upload("./tmp")) 
//rotas para criar um cadastro, login e detalhes do usuario

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        status: 200,
        message: 'API disponível e online'
    })
})


router.post('/register', new UsersRegisterController().handle)
router.post("/login", new UsersLoginController().handle)

// rotas para os usuários
router.get("/users", isLogged, new UsersDetailsController().handle)
router.delete("/users/:id", isLogged, new UsersDeleteController().handle)
router.put("/users/:id", isLogged, new UsersEditController().handle)
router.get("/users", isLogged, new UsersGetAllController().handle)
router.get("/users/list", isLogged, new UsersGetAllListController().handle)


 
// rotas para cadastrar categorias 
router.post("/categorias", isLogged,upload.fields([{ name: "iconeCategoria" }, { name: "urlBannerCategoria" }]), new CadastroCategoriasController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.get("/categorias", isLogged, new ListagemTodasCategoriasController().handle)  // essa rota vai ser chamada no Aplicativo front end( usuario )
router.get("/categorias/:id", isLogged,new ListagemCategoriasIdController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.put("/categorias", isLogged,upload.fields([{name: 'iconeCategoria'},{name: "urlBannerCategoria"}]), new EditarCategoriasController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.delete("/categorias/:id", isLogged, new DeletarCategoriaController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )

// rotas para cadastrar Eventos

router.post("/eventos", isLogged, new CadastrarEventoController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario )
router.get("/eventos", isLogged, new ListarTodosEventosController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
router.get("/eventos/:id", isLogged, new ListarEventoIdController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
router.put("/eventos", isLogged, upload.single('bannerEvento'), new EditarEventoController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
router.delete("/eventos/:id", isLogged,new DeletarEventoController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)


// rotas para cadastrar os produtos da Up Point 
router.post("/produtos", isLogged, new CadastroProdutoController().handle)
router.put("/produtos", isLogged, new EditarProdutosController().handle)
router.get("/produtos", isLogged, new ListarProdutosController().handle)
router.get("/produtos/:id", isLogged, new ListarDetalhesProdutosController().handle)
router.delete("/produtos/:id", isLogged, new DeletarProdutosController().handle)

export {router}