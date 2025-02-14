import prismaClient from "../../prisma";

interface ICategoriesGetDetailsService {
    id: string
    idUserOwner?: string | null
}

class CategoriesGetDetailsService {
    async execute({
        id,
        idUserOwner
    }: ICategoriesGetDetailsService){
        if(!id){
            return {
                data: {
                    message: "Não foi possível prosseguir com esta ação, por favor envio o id da categoria para prosseguir",
                    status: 400
                }
            }
        }

        if(!idUserOwner){
            return {
                data: {
                    message: "Não foi possível prosseguir com esta ação, por favor envio o id do responsável para prosseguir",
                    status: 400
                }
            }
        }

        const categoryExists = await prismaClient.categories.findFirst({
            where: {
                id: id,
                idUserOwner: idUserOwner
            }
        })

        if(!categoryExists){
            return {
                data: {
                    message: "Não foi possível prosseguir com esta ação, essa categoria não existe",
                    status: 404
                }
            }
        }

        return {
            data: {
                item: categoryExists,
                status: 200
            }
        }
       
    }
}

export {CategoriesGetDetailsService}