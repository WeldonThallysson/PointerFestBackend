import prismaClient from "../../prisma";


class ListarProdutosService {
    async execute(){
        const produtos = await prismaClient.produtos.findMany()

        return produtos
    }
}

export {ListarProdutosService}