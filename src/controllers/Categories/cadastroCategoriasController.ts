import { Request, Response } from "express";
import { CadastroCategoriasService } from "../../services/Categories/cadastroCategoriasService";

interface IResponseCadastroCategoria {
  status?: number
  message?: string
}
class CadastroCategoriasController {
  async handle(req: Request, res: Response) {
    const id_user_logged = req.user_id
    const { name,icon,label,themeImageUrl } = req.body;

    //const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    //const iconeCategoria = files["iconeCategoria"]?.[0].filename;
    //const urlBannerCategoria = files["urlBannerCategoria"]?.[0].filename;

    const cadastroCategoria = new CadastroCategoriasService();
    const cadastro = await cadastroCategoria.execute({
      idUserOwner: id_user_logged,
      name, 
      label,
      icon,
      themeImageUrl,
    }) as IResponseCadastroCategoria;

      if(cadastro.status === 403){
        return res.status(403).json(cadastro)
      }
  
      res.json(cadastro);

 
  }
}

export { CadastroCategoriasController };
