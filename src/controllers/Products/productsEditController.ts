
import { Request,Response } from "express"
import { ProductsEditService } from "../../services/Products/productEditService"

class ProductsEditController {
    async handle(req: Request,res: Response){
        const {
            id,
            idCategory,
            name,
            allowAddCoupon,
            available,
            description,
            expirationDate, 
            idTypeProduct,
            labelPrice,
            positionOrder,
            price,
            status
        } = req.body
        
        const idUserOwner = req.user_id
        
        const productsEdit = new ProductsEditService()
        const responseProductsEdit = await productsEdit.execute({
            id,
            idCategory,
            name,
            allowAddCoupon,
            available,
            description,
            expirationDate, 
            idTypeProduct,
            idUserOwner,
            labelPrice,
            positionOrder,
            price,
            status

        })
    
        return res.status(responseProductsEdit.data.status).json(responseProductsEdit.data)
    }
}

export {ProductsEditController}