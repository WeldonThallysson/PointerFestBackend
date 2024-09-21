import { Request, Response } from "express";
import { DeletarProdutosService } from "../../services/Produtos/deletarProdutoService";

class DeletarProdutosController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if (id === "") {
      return res.status(400).json({
        status: 400,
        message: "Informe o id do produto para deletar",
      });
    }

    const deletarProdutos = new DeletarProdutosService();
    const produto = await deletarProdutos.execute({ idProduto: id });

    return res.status(200).json(produto);
  }
}

export { DeletarProdutosController };
