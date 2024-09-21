import prismaClient from "../../prisma";

interface IDeletarProdutosService {
    idProduto: string 
}
class DeletarProdutosService {
    async execute({idProduto}:IDeletarProdutosService){
        const produtoDeletado = await prismaClient.produtos.delete({
            where: {
                id: idProduto
            }
        })

        return {
            status: 200,
            produto: produtoDeletado.id,
            message: "Produto deletado com sucesso"

        }
    }
}

export {DeletarProdutosService}