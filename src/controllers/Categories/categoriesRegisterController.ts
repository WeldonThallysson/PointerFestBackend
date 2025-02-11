import { Request, Response } from "express";
import { CategoriesRegisterService } from "../../services/Categories/categoriesRegisterService";
import { UploadedFile } from "express-fileupload";

interface IResponseCadastroCategoria {
  status?: number
  message?: string
}
class CategoriesRegisterController {
  async handle(req: Request, res: Response) {
    const id_user_logged = req.user_id
    const { name,  label, themeImageUrl } = req.body;

    const icon = req.files.icon as UploadedFile

    //const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    //const iconeCategoria = files["iconeCategoria"]?.[0].filename;
    //const urlBannerCategoria = files["urlBannerCategoria"]?.[0].filename;

    const categoriesRegister = new CategoriesRegisterService();
    const responseCategoriesRegister = await categoriesRegister.execute({
      idUserOwner: id_user_logged,
      name, 
      label,
      icon,
      themeImageUrl,
    }) as IResponseCadastroCategoria;


     return res.status(responseCategoriesRegister.data.status).json(responseCategoriesRegister.data);

 
  }
}

export { CategoriesRegisterController };
