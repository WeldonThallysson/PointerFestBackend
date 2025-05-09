import { Router,Request,Response } from "express";

import { UsersRegisterController } from "./controllers/Users/Auth/usersRegisterController";  
import { UsersLoginController } from "./controllers/Users/Auth/usersLoginController"; 

import { UsersGetDetailsController } from "./controllers/Users/usersGetDetailsController";
 
import { isLogged } from "./middlewares/isLogged";
import { UsersDeleteController } from "./controllers/Users/usersDeleteController";
import { CategoriesRegisterController } from "./controllers/Categories/categoriesRegisterController";
import { CategoriesGetAllController } from "./controllers/Categories/categoriesGetAllController";
import { CategoriesGetDetailsController } from "./controllers/Categories/categoriesGetDetailsController";
import { CategoriesEditController } from "./controllers/Categories/categoriesEditController";
import { CategoriesDeleteController } from "./controllers/Categories/categoriesDeleteController";
 
import { CadastrarEventoController } from "./controllers/Events/cadastrarEventoController";
import { ListarTodosEventosController } from "./controllers/Events/listarTodosEventosController";
import { ListarEventoIdController } from "./controllers/Events/listarEventoIdController";
import multer from "multer";
import uploadConfig from '../src/config/multer';
import { EditarEventoController } from "./controllers/Events/editarEventoController";
import { DeletarEventoController } from "./controllers/Events/deletarEventoController";
import { UsersEditController } from "./controllers/Users/usersEditController";
import { UsersGetAllController } from "./controllers/Users/usersGetAllController";
import { ProductRegisterController } from "./controllers/Products/productsRegisterController";

import { ProductGetAllController } from "./controllers/Products/productsGetAllController";
import { ProductsDeleteController } from "./controllers/Products/productDeleteController";
import { ProductGetDetailsController } from "./controllers/Products/productsGetDetailsController";
import { ProductsEditController } from "./controllers/Products/productsEditController";
import { UsersGetAllListController } from "./controllers/Users/usersListUsersController";
import { RecoverPasswordController } from "./controllers/Users/PasswordRecover/recoverPasswordUserController";
import { RedefinePasswordController } from "./controllers/Users/PasswordRecover/redefinePasswordUserController";
import { AllowAccessUserController } from "./controllers/Users/Permissions/allowAccessUserController";
import { AllowUpdateTutorialFirstAccessController } from "./controllers/Users/Permissions/allowUpdateTutorialFirstAccessController";
import { AllowUpdateTermsController } from "./controllers/Users/Permissions/allowUpdateTermsController";
import { UsersRegisterOtherController } from "./controllers/Users/usersRegisterController";
import { BinDeleteItemsController } from "./controllers/Bin/binDeleteItemsController";
import { BinEditItemsController } from "./controllers/Bin/binEditItemsController";
import { BinRegisterMoveItemsController } from "./controllers/Bin/binRegisterMoveItemsController";
import { BinGetDetailsItemsController } from "./controllers/Bin/binGetDetailsItemsController";
import { BinGetAllItemsController } from "./controllers/Bin/binGetAllItemsController";
import { BinRestoreItemsController } from "./controllers/Bin/binRestoreItemsController";

const router = Router()

const upload = multer(uploadConfig.upload("./tmp")) 
//rotas para criar um cadastro, login e detalhes do usuario

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        status: 200,
        message: 'API disponível e online'
    })
})


router.post("/auth/login", new UsersLoginController().handle); // endpoint para login
router.post("/auth/register", new UsersRegisterController().handle); // endpoint para cadastrar uma conta cliente normal
router.post("/auth/recoverpassword", new RecoverPasswordController().handle) // endpoint para requerir a recuperação de senha com email
router.post("/auth/redefinepassword", new RedefinePasswordController().handle) // endpoint para redefinir a senha com token gerado pelo sistema.

// rotas para os usuários

 
router.post("/users", new UsersRegisterOtherController().handle); 
router.get("/users/list", isLogged, new UsersGetAllListController().handle)
router.get("/users/:id", isLogged, new UsersGetDetailsController().handle)
router.delete("/users/:id", isLogged, new UsersDeleteController().handle)
router.put("/users", isLogged, new UsersEditController().handle)
router.get("/users", isLogged, new UsersGetAllController().handle)

router.put("/users/permissions", isLogged, new AllowAccessUserController().handle); // endpoint para contas master poderem tornar outras contas master
router.put("/users/firstAcess", isLogged, new AllowUpdateTutorialFirstAccessController().handle)
 
router.put("/users/terms", isLogged, new AllowUpdateTermsController().handle);//atualiza

// endpoint para a lixeira
router.post("/bin", isLogged, new BinRegisterMoveItemsController().handle);
router.get("/bin/:id", isLogged, new BinRestoreItemsController().handle)
router.put("/bin", isLogged, new BinEditItemsController().handle);
router.get("/bin", isLogged, new BinGetAllItemsController().handle);
router.get("/bin", isLogged, new BinGetDetailsItemsController().handle);
router.delete("/bin/:id", isLogged, new BinDeleteItemsController().handle);


// rotas para cadastrar categorias 
router.post("/categories", isLogged, new CategoriesRegisterController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.get("/categories", isLogged, new CategoriesGetAllController().handle)  // essa rota vai ser chamada no Aplicativo front end( usuario )
router.get("/categories/:id", isLogged, new CategoriesGetDetailsController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.put("/categories", isLogged, new CategoriesEditController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )
router.delete("/categories/:id", isLogged, new CategoriesDeleteController().handle) // essa rota vai ser chamada no Aplicativo front end( admin )

// rotas para cadastrar Eventos

router.post("/eventos", isLogged, new CadastrarEventoController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario )
router.get("/eventos", isLogged, new ListarTodosEventosController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
router.get("/eventos/:id", isLogged, new ListarEventoIdController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
router.put("/eventos", isLogged, upload.single('bannerEvento'), new EditarEventoController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)
router.delete("/eventos/:id", isLogged,new DeletarEventoController().handle)   // essa rota vai ser chamada no Aplicativo front end( usuario)


// rotas para cadastrar os produtos da Up Point 
router.post("/produtos", isLogged, new ProductRegisterController().handle)
router.put("/produtos", isLogged, new ProductsEditController().handle)
router.get("/produtos", isLogged, new ProductGetAllController().handle)
router.get("/produtos/:id", isLogged, new ProductGetDetailsController().handle)
router.delete("/produtos/:id", isLogged, new ProductsDeleteController().handle)

export {router}