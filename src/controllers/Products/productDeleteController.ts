import { Request, Response } from "express";
import { ProductsDeleteService } from "../../services/Products/productsDeleteService";

class ProductsDeleteController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const idUserOwner = req.user_id
    const productsDelete = new ProductsDeleteService();
    const responseProductsDelete = await productsDelete.execute({ id, idUserOwner });

    return res.status(responseProductsDelete.data.status).json(responseProductsDelete.data);
  }
}

export { ProductsDeleteController };
