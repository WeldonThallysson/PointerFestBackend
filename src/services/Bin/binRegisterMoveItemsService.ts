import prismaClient from "../../prisma";



interface IBinRegisterItemsService {
    id: string;
    idUserOwner: string;
    tableName: string;
}

class BinRegisterMoveItemsService {
    async execute({id, idUserOwner, tableName}: IBinRegisterItemsService){
        if(!idUserOwner){
            return {
                data :{
                    message: "Não foi possível prosseguir com está ação, Informe o ID do responsável",
                    status:400
                }
            }
        }

        if((!id || !tableName)){
            return {
                data: {
                    message: "Não foi possível prosseguir com está ação, Informe o ID e o nome da tabela",
                    status: 400
                }
            }
        }

        const item = await prismaClient.$queryRawUnsafe(`SELECT * FROM ${tableName} WHERE id = '${id}'`)
        

        try {
            await prismaClient.bin.create({
                data: {
                  tableName,
                  itemId: id,
                  idUserOwner: idUserOwner,
                  data: JSON.stringify(item)   
                }
            })
            await prismaClient.$executeRawUnsafe(`DELETE FROM ${tableName} WHERE id = '${id}'`)

            return {
                data: {
                   message: `Item movido para a lixeira com sucesso`,
                   status: 200
                }
         
            }
        } catch(err){
            return {
                data: {
                    message: `Ocorreu um erro ao mover item para a lixeira ${err}`,
                    status: 500
                }
            }
        }

    }

}

export {BinRegisterMoveItemsService}