import { Request, Response } from "express";
import { CategoriesEditService } from "../../services/Categories/categoriesEditService";
import { UploadedFile } from "express-fileupload";

class CategoriesEditController {
  async handle(req: Request, res: Response) {
    const { 
      id, 
      idUserOwner,
      name, 
      label,
      themeImageUrl,
    } = req.body;

    //const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    //const iconeCategoria = files["iconeCategoria"]?.[0].filename;
    //const urlBannerCategoria = files["urlBannerCategoria"]?.[0]?.filename;
    const icon = req.files.icon as UploadedFile

    const categoriesEditController = new CategoriesEditService();
    const responseCategoriesEditController = await categoriesEditController.execute({
      id,
      idUserOwner,
      name, 
      label,
      icon,
      themeImageUrl,
      //iconeCategoria,
      //urlBannerCategoria,
    });

    return res.status(responseCategoriesEditController.data.status).json(responseCategoriesEditController.data);
  }
}

export { CategoriesEditController };
