import prismaClient from "../../prisma";

interface DeletarCidadesIdType {
    id: string;
}

class DeletarCidadesIdService {
    async execute({id}: DeletarCidadesIdType){

           
          const deletarcidadeid = await prismaClient.cidades.delete({
            where: {
                id: id
            }
          })

        return deletarcidadeid;
      
            

    }
}

export {DeletarCidadesIdService}