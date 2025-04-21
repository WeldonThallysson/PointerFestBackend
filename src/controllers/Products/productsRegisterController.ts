import { Request,Response } from "express";
import { ProductsRegisterService } from "../../services/Products/productsRegisterService";

class ProductRegisterController {
  async handle(req: Request, res: Response) {
    const {
      name,
      description,
      expirationDate,
      idCategory,
      idTypeProduct,
      price,
      allowAddCoupon,
      available,
      labelPrice,
      positionOrder,
    } = req.body
      
     const idUserOwner = req.user_id
     const productsRegister = new ProductsRegisterService()
     
     const responseProductsRegister = await productsRegister.execute({
      name,
      description,
      expirationDate,
      idCategory,
      idTypeProduct,
      idUserOwner,
      labelPrice,
      positionOrder,
      price,
      allowAddCoupon,
      available,
     })
 
     return res.status(responseProductsRegister.data.status).json(responseProductsRegister.data)
  }
}


export {ProductRegisterController}