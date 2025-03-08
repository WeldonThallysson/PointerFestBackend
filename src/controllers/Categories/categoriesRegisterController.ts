import { Request, Response } from "express";
import { CategoriesRegisterService } from "../../services/Categories/categoriesRegisterService";
import { UploadedFile } from "express-fileupload";
class CategoriesRegisterController {
  async handle(req: Request, res: Response) {
    const id_user_logged = req.user_id
    const { name,  label,  } = req.body;

    const icon = req.files.icon as UploadedFile
    const themeImageUrl = req.files.themeImageUrl as UploadedFile
 
    const categoriesRegister = new CategoriesRegisterService();
    const responseCategoriesRegister = await categoriesRegister.execute({
      idUserOwner: id_user_logged,
      name, 
      label,
      icon,
      themeImageUrl,
    })  


     return res.status(responseCategoriesRegister.data.status).json(responseCategoriesRegister.data);

 
  }
}

export { CategoriesRegisterController };
