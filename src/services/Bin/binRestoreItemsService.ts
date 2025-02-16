import prismaClient from "../../prisma";

interface IBinRestoreItemsService {
    id?: string | null;

}


class BinRestoreItemsService {
    async execute({id}: IBinRestoreItemsService){
        if(!id){
            return {
                message: "Informe o ID do item na lixeira",
                status: 400
            }
        }  

        const itemBinExists = await prismaClient.bin.findUnique({
            where: {
                id: id,
            }
        })
    
        if(!itemBinExists){
            return {
                message: "Não foi possível prosseguir com a ação, item não encontrado na lixeira",
                status: 404
            }
        } 

        try {
             await prismaClient.$executeRawUnsafe(`
                INSERT INTO ${itemBinExists.tableName}(${Object.keys(itemBinExists.data).join(", ")})
                VALUES (${Object.values(itemBinExists.data).map((value) => `'${value}`).join(", ")})
                `)

                await prismaClient.bin.delete({
                    where: { id }
                });

                return {
                    message: "Item restaurado com sucesso",
                    status: 200
                };
        }
        catch(err){
            return {
                message: `Ocorreu um erro na restauração do item: ${err}`,
                status: 500
            }

        }
    }   
}

export {BinRestoreItemsService}