import prismaClient from "../../prisma";

interface IEditarProduto {
    idProduto: string
    nome: string
    descricao: string
    preco: number,
    status: boolean
}
class EditarProdutosService {
    async execute({idProduto, nome, descricao,preco,status}: IEditarProduto){
/*
        const produtoEditado = await prismaClient.products.update({
            where: {
                id: idProduto
            },
            data: {
                nome: nome,
                descricao: descricao,
                preco: preco,
                status: status
            }
        })
*/
        return {
            status: 200,
            message: "Alteração realizada com sucesso",
        }
    }
}

export {EditarProdutosService}