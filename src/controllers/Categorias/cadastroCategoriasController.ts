import { Request, Response } from "express";
import { CadastroCategoriasService } from "../../services/Categorias/cadastroCategoriasService";


class CadastroCategoriasController {
     async handle(req: Request, res: Response){
            const {nomeCategoria} = req.body

            const cadastroCategoria = new CadastroCategoriasService()
            const cadastro = await cadastroCategoria.execute({nomeCategoria})

            return res.json(cadastro)
     }

}   

export {CadastroCategoriasController}