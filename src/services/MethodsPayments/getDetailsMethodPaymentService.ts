 
import prismaClient from "../../prisma"



interface IGetDetailsMethodPaymentService {
    id: string
    id_user_logged: string
}

class GetDetailsMethodPaymentService {
    async execute({id, id_user_logged}: IGetDetailsMethodPaymentService){
      
      

        if(!id){
            return {
                data: {
                    message: "Não foi possível prosseguir com a ação, informe o id do método de pagamento",
                    status: 400
                }
            }
        }
        
        const methodExists = await prismaClient.methodsPayments.findFirst({
            where: {
                id:id
            }
        })

     
        const userExistsLogged = await prismaClient.users.findFirst({
            where: {
                id: id_user_logged
            }
        })


        if(!methodExists){
            return {
                    data: {
                        message: "Não foi possível prosseguir com a ação, método de pagamento não existe.",
                        status: 404
                    }
            }
        }

        if(!userExistsLogged){
            return {
                data: {
                    message: "Não foi possível prosseguir com a ação, usuário responsavel não encontrado.",
                    status: 400
                }
            }
        }


            try {
                const responseFindMethodsPayment =  await prismaClient.methodsPayments.findFirst({
                    where: {
                        id: id
                    }
                })

               return {
                    data: {
                        items: {
                            ...responseFindMethodsPayment,
                        },
                        status: 200
                    }
                }
                
            }
            catch(err){
                console.log(err)
                return {
                    data: {
                        message: "Não foi possível prosseguir com a ação, algum error ao buscar detalhes método de pagamento",
                        status: 400
                    }
                }
            }
        



    }
}

export {GetDetailsMethodPaymentService}