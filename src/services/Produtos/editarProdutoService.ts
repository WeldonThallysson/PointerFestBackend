import prismaClient from "../../prisma";

interface IEditarProduto {
    idProduto: string
    nome: string
    descricao: string
}
class EditarProdutosService {
    async execute({idProduto, nome, descricao}: IEditarProduto){

        const produtoEditado = await prismaClient.produtos.update({
            where: {
                id: idProduto
            },
            data: {
                nome: nome,
                descricao: descricao
            }
        })

        return produtoEditado
    }
}

export {EditarProdutosService}