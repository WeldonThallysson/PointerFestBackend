import { Request,Response } from "express";
import { CadastroProdutoService } from "../../services/Produtos/cadastroProdutoService";


class CadastroProdutoController {
  async handle(req: Request, res: Response) {
    const {nome,descricao} = req.body
    

    if(nome === '' && descricao === ''){
        return res.status(400).json({
            status: 400,
            message: "Informe o nome do produto e a descrição!"
        })
    }

     const cadastroProduto = new CadastroProdutoService()
     const resCadastro = await cadastroProduto.execute({nome,descricao})

     return res.status(200).json(resCadastro)
  }
}


export {CadastroProdutoController}