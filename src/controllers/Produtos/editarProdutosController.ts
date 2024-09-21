
import { Request,Response } from "express"
import { EditarProdutosService } from "../../services/Produtos/editarProdutoService"

class EditarProdutosController {
    async handle(req: Request,res: Response){
        const {idProduto, nome, descricao} = req.body
        
        if(idProduto === '' && nome === '' && descricao === ''){
            return res.status(400).json({
                status: 400,
                message: "Informe o id, nome e descrição do produto"
            })
        }
        
        const produtoEditado = new EditarProdutosService()
        const produtos = await produtoEditado.execute({idProduto, nome, descricao})
    
        return res.status(200).json(produtos)
    }
}

export {EditarProdutosController}