import prismaClient from "../../prisma";

interface DeletarCategoriasType {
    id: string

}

class DeletarCategoriasIdService{
    async execute({id}: DeletarCategoriasType){
        const deletarCategoriasId = await prismaClient.categories.delete({
            where: {
                id: id
            }
        })

        return deletarCategoriasId
    }

}

export {DeletarCategoriasIdService}