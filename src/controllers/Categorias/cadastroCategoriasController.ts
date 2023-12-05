import { Request, Response } from "express";
import { CadastroCategoriasService } from "../../services/Categorias/cadastroCategoriasService";


class CadastroCategoriasController {
     async handle(req: Request, res: Response){
            const {nome} = req.body

            const cadastroCategoria = new CadastroCategoriasService()
            const cadastro = await cadastroCategoria.execute({nome})

            return res.json(cadastro)
     }

}   

export {CadastroCategoriasController}