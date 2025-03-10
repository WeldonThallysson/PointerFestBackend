import { Request,Response } from "express";
import { ListarDetalhesProdutosService } from "../../services/Products/productsGetDetailsSevice";

class ListarDetalhesProdutosController {
  async handle(req: Request, res: Response) {
     const {id} = req.params
     const listarProduto = new ListarDetalhesProdutosService()
     const listaProduto = await listarProduto.execute({id})

     return res.status(200).json(listaProduto)
  }
}


export {ListarDetalhesProdutosController}