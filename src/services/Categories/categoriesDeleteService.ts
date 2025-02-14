import prismaClient from "../../prisma";

interface DeletarCategoriasType {
    id: string

}

class DeletarCategoriasIdService{
    async execute({id}: DeletarCategoriasType){

        if(!id){
            return {
                data: {
                    message: "Não foi possível prosseguir com esta ação, por favor informe o id da categoria",
                    status: 400
                }
            }
        }


        const deletarCategoriasId = await prismaClient.categories.delete({
            where: {
                id: id
            }
        })

        return deletarCategoriasId
    }

}

export {DeletarCategoriasIdService}