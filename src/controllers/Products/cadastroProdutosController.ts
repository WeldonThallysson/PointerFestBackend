import { Request,Response } from "express";
import { CadastroProdutoService } from "../../services/Products/cadastroProdutoService";


class CadastroProdutoController {
  async handle(req: Request, res: Response) {
    const {nome,descricao,preco} = req.body
    
    if(nome === '' && descricao === '' && preco){
        return res.status(400).json({
            status: 400,
            message: "Informe o nome, descrição e o preço do produto!"
        })
    }
 
     const cadastroProduto = new CadastroProdutoService()
     
     const resCadastro = await cadastroProduto.execute({nome,descricao,preco})
    
     if(resCadastro.status === 400){
      return res.status(400).json(resCadastro)
     }
     
     return res.status(200).json(resCadastro)
  }
}


export {CadastroProdutoController}