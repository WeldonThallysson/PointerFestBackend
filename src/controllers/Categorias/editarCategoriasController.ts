import { Request, Response } from "express";
import { EditarCategoriasService } from "../../services/Categorias/editarCategoriasService";

class EditarCategoriasController {
  async handle(req: Request, res: Response) {
    const { id, nome } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const iconeCategoria = files["iconeCategoria"]?.[0].filename;
    const urlBannerCategoria = files["urlBannerCategoria"]?.[0]?.filename;

    const editarCategoria = new EditarCategoriasService();
    const editar = await editarCategoria.execute({
      id,
      nome,
      iconeCategoria,
      urlBannerCategoria,
    });

    return res.json(editar);
  }
}

export { EditarCategoriasController };
