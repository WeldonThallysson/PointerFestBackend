import { MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";

interface ITypeProductsGetDetailsService {
    id: string
    idUserOwner?: string | null
}

class TypeProductsGetDetailsService {
    async execute({
        id,
        idUserOwner
    }: ITypeProductsGetDetailsService){
        try {
            if(!id){
                return {
                    data: {
                        message: "Não foi possível prosseguir com esta ação, por favor envio o id do tipo do comercial para prosseguir",
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
    
            const typeProductsExists = await prismaClient.typesProducts.findFirst({
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
    
            if(!typeProductsExists){
                return {
                    data: {
                        message: "Não foi possível prosseguir com esta ação, esse tipo do produto não existe",
                        status: 404
                    }
                }
            }
    
            return {
                data: {
                    item: typeProductsExists,
                    status: 200
                }
            }
           

        } catch (err) {
            return {
                data: {
                  message: `${MessagesError.GetDetailsMessageError} ${err}`,
                  status: 500,
                },
              };
        }
     
    }
}

export {TypeProductsGetDetailsService}