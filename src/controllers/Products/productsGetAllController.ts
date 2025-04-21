import { Request,Response } from "express";
import { ProductsGetAllService } from "../../services/Products/productsGetAllService";

class ProductGetAllController {
  async handle(req: Request, res: Response) {
     const name = req.query.name as string
     const page = req.query.page as string
     const limit = req.query.limit as string
     const idUserLogged = req.query.idUserLogged as string;
     const idUserOwner = req.query.idUserOwner as string;
     const idTypeProduct = req.query.idTypeProduct as string;
     const available = req.query.available as string
     const status = req.query.status as string


     const productGetAll = new ProductsGetAllService()
     const responseProductGetAll = await productGetAll.execute({
      available,
      idTypeProduct,
      idUserLogged,
      idUserOwner,
      limit: Number(limit),
      name,
      page: Number(page),
      ...(status !== null && {status: status !== 'false' ? true : false}),
     })

     return res.status(responseProductGetAll.data.status).json(responseProductGetAll.data)
  }
}

export {ProductGetAllController}