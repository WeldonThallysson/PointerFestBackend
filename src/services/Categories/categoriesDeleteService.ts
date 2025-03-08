import prismaClient from "../../prisma";
import { BinRegisterMoveItemsService } from "../Bin/binRegisterMoveItemsService";
interface DeletarCategoriasType {
    id: string
}

class CategoriesDeleteService{
    async execute({id}: DeletarCategoriasType){

        if(!id){
            return {
                data: {
                    message: "Não foi possível prosseguir com esta ação, por favor informe o id da categoria",
                    status: 400
                }
            }
        }

        const categoriesExists = await prismaClient.categories.findFirst({where: {id: id}})

        if(!categoriesExists){
            return {
                data: {
                    message: "Não foi possível prosseguir com esta ação, essa categoria não existe",
                    status: 404
                }
            }
        }

        const binRegisterItemsService = new BinRegisterMoveItemsService() 

        const deletarCategoriasId = await binRegisterItemsService.execute({
            id: id,
            tableName: "categories",
            idUserOwner: categoriesExists.idUserOwner
        })  

        return {
            data: {
                message: deletarCategoriasId.data.message,
                status: deletarCategoriasId.data.status
            }
        }   
     }

}

export {CategoriesDeleteService}