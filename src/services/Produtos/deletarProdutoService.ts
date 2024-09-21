import prismaClient from "../../prisma";

interface IDeletarProdutosService {
    id: string 
}
class DeletarProdutosService {
    async execute({id}:IDeletarProdutosService){
        const produtoDeletado = await prismaClient.produtos.delete({
            where: {
                id: id
            }
        })

        return {
            status: 200,
            idProduto: produtoDeletado.id,
            message: "Exclusão realizada com sucesso"

        }
    }
}

export {DeletarProdutosService}