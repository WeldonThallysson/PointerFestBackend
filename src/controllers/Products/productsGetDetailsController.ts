import { Request,Response } from "express";
import { ProductsGetDetailsSevice } from "../../services/Products/productsGetDetailsSevice";

class ProductGetDetailsController {
  async handle(req: Request, res: Response) {
     const {id} = req.params
     const productsGetDetails = new ProductsGetDetailsSevice()
     const responseProductsGetDetails = await productsGetDetails.execute({id})

     return res.status(responseProductsGetDetails.data.status).json(responseProductsGetDetails.data)
  }
}


export {ProductGetDetailsController}