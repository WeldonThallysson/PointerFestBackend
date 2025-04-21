import { Messages, MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";
import { todayWithTimeAtFormat } from "../../utils/formatters/formatterToday";
import { validationsProductsService } from "../../utils/validationsServices/validationsProducts";


interface IProductsEdit {
    id: string
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
  
    status: boolean
}
 
class ProductsEditService {
  async execute ({ 
    id,
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
   status
  }: IProductsEdit) {

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
            id: id
         } 
      })

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
      if(!productExists){
         return {
            status: 400,
            message: "Não foi possível prosseguir, esse produto não existe"
         }
      }

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
         
         await prismaClient.products.update({
            where: {
                id: id
            },
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
               positionOrder: positionOrder ? positionOrder : null,
               price: price ? price : null,
               status: status ? status : null
            }
         })  
        
         return {
            status: 200,
            message: Messages.UpdateMessageSuccess,
         }
      } catch(err) {
         return {
            status: 500,
            message:  `${MessagesError.UpdateMessageError} ${err}`,
         }
      }
    
  }
}


export {ProductsEditService}