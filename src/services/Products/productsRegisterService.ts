import { Messages, MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";
import { todayWithTimeAtFormat } from "../../utils/formatters/formatterToday";
import { validationsProductsService } from "../../utils/validationsServices/validationsProducts";


interface IProductRegister {
    idCategory: string,
    idTypeProduct:string
    idUserOwner: string
    name: string
    description: string
  
    labelPrice: string // é a label que pode ir ao lado do preço se é a entrada,inteira,meia,promoção.
    price: number
  
    expirationDate: string
  
    positionOrder: number
  
    available: boolean 
    allowAddCoupon: boolean 
  
}
 
class ProductsRegisterService {
  async execute ({ 
   name,
   allowAddCoupon,
   available,
   description,
   expirationDate,
   idCategory,
   idTypeProduct,
   idUserOwner,
   labelPrice,
   positionOrder,
   price,
  }: IProductRegister) {

      const validationsProducts = validationsProductsService({
         name,
         idUserOwner,
         idCategory,
         idTypeProduct,
         description,
         price,
         allowAddCoupon,
         available,
      })
   

      if(validationsProducts){
         return validationsProducts
      }

      const productExists = await prismaClient.products.findFirst({
         where: {
            name: name
         } 
      })

      if(productExists){
         return {
            status: 400,
            message: "Não foi possível prosseguir, esse produto já existe"
         }
      }
 
   
      const categoryExists = await prismaClient.typesProducts.findFirst({
        where: {
           id: idCategory
        } 
     })

     const typesProductsExists = await prismaClient.typesProducts.findFirst({
        where: {
           id: idTypeProduct
        } 
     })

     const userExists = await prismaClient.typesProducts.findFirst({
        where: {
           id: idUserOwner
        } 
     })
   
      if(!categoryExists){
        return {
           status: 400,
           message: "Não foi possível prosseguir, esse categoria não existe"
        }
     }

     
     if(!typesProductsExists){
        return {
           status: 400,
           message: "Não foi possível prosseguir, esse tipo do produto não existe"
        }
     }

     if(!userExists){
        return {
            status: 400,
            message: "Não foi possível prosseguir, esse usuário não existe"
         }
     }
     
      try {
         const todayAt = todayWithTimeAtFormat(new Date)
         await prismaClient.products.create({
            data: {
               name: name,
               allowAddCoupon: allowAddCoupon !== null ? allowAddCoupon : null,
               available: available !== null ? available : null,
               description: description,
               expirationDate: expirationDate ? expirationDate : null,
               idCategory: idCategory,
               idTypeProduct: idTypeProduct,
               idUserOwner: idUserOwner,
               labelPrice: labelPrice,
               dateRegistered: todayAt,
               positionOrder: positionOrder ? positionOrder : null,
               price: price ? price : null, 
            }
         })  
        
         return {
            status: 200,
            message: Messages.RegisterMessageSuccess,
         }
      } catch(err) {
         return {
            status: 500,
            message:  `${MessagesError.RegisterMessageError} ${err}`,
         }
      }
    
  }
}


export {ProductsRegisterService}