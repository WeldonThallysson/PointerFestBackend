import { Request,Response } from "express";
import { ListarProdutosService } from "../../services/Products/listarProdutoSevice";

class ListarProdutosController {
  async handle(req: Request, res: Response) {

     const listarProduto = new ListarProdutosService()
     const listaProdutos = await listarProduto.execute()

     return res.status(200).json(listaProdutos)
  }
}


export {ListarProdutosController}