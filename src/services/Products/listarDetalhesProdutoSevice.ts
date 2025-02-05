import prismaClient from "../../prisma";

interface IListarDetalhesProdutosService {
    id: string
}

class ListarDetalhesProdutosService {
    async execute({id}: IListarDetalhesProdutosService){
        const produtos = await prismaClient.products.findFirst({
            where: {
                id: id
            }
        })

        return produtos
    }
}

export {ListarDetalhesProdutosService}