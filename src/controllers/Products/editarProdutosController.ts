
import { Request,Response } from "express"
import { EditarProdutosService } from "../../services/Products/editarProdutoService"

class EditarProdutosController {
    async handle(req: Request,res: Response){
        const {idProduto, nome, descricao, preco,status} = req.body
        
        if(idProduto === '' && nome === ''){
            return res.status(400).json({
                status: 400,
                message: "Informe o id e o nome do produto para realizar a ação"
            })
        }

        const produtoEditado = new EditarProdutosService()
        const produtos = await produtoEditado.execute({idProduto, nome, descricao,preco,status})
    
        return res.status(200).json(produtos)
    }
}

export {EditarProdutosController}