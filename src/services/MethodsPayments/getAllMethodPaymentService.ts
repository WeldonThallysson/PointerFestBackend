
import prismaClient from "../../prisma"



interface IGetAllMethodPaymentService {
    id_user_logged: string
    name?: string
    description?: string
    typeMethodPayment?: string
}

class GetAllMethodPaymentService {
    async execute({id_user_logged, name, description,typeMethodPayment}: IGetAllMethodPaymentService){
        const userExistsLogged = await prismaClient.users.findFirst({
            where: {
                id: id_user_logged
            }
        })

        if(!userExistsLogged){
            return {
                data: {
                    message: "Não foi possível prosseguir com a ação, usuário responsavel não encontrado.",
                    status: 400
                }
            }
        }

            try {
                const responseFindMethodsPayment = await prismaClient.methodsPayments.findMany({
                    where: {
                        name: {
                            contains: name,
                             mode: "insensitive"
                        }, 
                        description: {
                            contains: description,
                            mode: "insensitive"
                        },
                        typeMethodPayment: {
                            contains: typeMethodPayment,
                            mode: "insensitive"
                        }
                    },
                    orderBy: { created_At: "asc" },
                })

               return {
                    data: {
                        items: responseFindMethodsPayment,
                        status: 200
                    }
                }
                
            }
            catch(err){
                console.log(err)
                return {
                    data: {
                        message: "Não foi possível prosseguir com a ação, algum error ao buscar métodos de pagamento",
                        status: 400
                    }
                }
            }
        



    }
}

export {GetAllMethodPaymentService}