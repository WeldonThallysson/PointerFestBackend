import prismaClient from "../../prisma";

interface IListarDetalhesProdutosService {
    id: string
}

class ListarDetalhesProdutosService {
    async execute({id}: IListarDetalhesProdutosService){
        const produtos = await prismaClient.produtos.findFirst({
            where: {
                id: id
            }
        })

        return produtos
    }
}

export {ListarDetalhesProdutosService}