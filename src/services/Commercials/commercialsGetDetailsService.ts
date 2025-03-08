import prismaClient from "../../prisma";

interface ICommercialGetDetailsService {
    id: string
    idUserOwner?: string | null
}

class CommercialGetDetailsService {
    async execute({
        id,
        idUserOwner
    }: ICommercialGetDetailsService){
        if(!id){
            return {
                data: {
                    message: "Não foi possível prosseguir com esta ação, por favor envio o id do comercial para prosseguir",
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

        const userExists = await prismaClient.users.findFirst({
            where: {
                id: idUserOwner
            }
        })

        const commercialExists = await prismaClient.commercials.findFirst({
            where: {
                id: id,
                idUserOwner: idUserOwner
            }
        })

        if(!userExists){
            return {
                data: {
                    message: "Não foi possível prosseguir com esta ação, esse usuário responsável não existe",
                    status: 404
                }
            }
        }

        if(!commercialExists){
            return {
                data: {
                    message: "Não foi possível prosseguir com esta ação, esse comercial não existe",
                    status: 404
                }
            }
        }

        return {
            data: {
                item: commercialExists,
                status: 200
            }
        }
       
    }
}

export {CommercialGetDetailsService}