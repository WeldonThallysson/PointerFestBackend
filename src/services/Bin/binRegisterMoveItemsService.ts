import prismaClient from "../../prisma";



interface IBinRegisterItemsService {
    id: string;
    tableName: string;
}

class BinRegisterItemsService {
    async execute({id, tableName}: IBinRegisterItemsService){

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
                  data: JSON.stringify(item)   
                }
            })
            await prismaClient.$executeRawUnsafe(`DELETE FROM ${tableName} WHERE id = '${id}'`)


            return {
                message: `Item movido para a lixeira`
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

export {BinRegisterItemsService}