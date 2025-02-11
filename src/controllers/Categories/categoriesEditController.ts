import { Request, Response } from "express";
import { EditarCategoriasService } from "../../services/Categories/editarCategoriasService";
import { UploadedFile } from "express-fileupload";

class CategoriesEditController {
  async handle(req: Request, res: Response) {
    const { 
      id, 
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
