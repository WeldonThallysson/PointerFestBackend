import prismaClient from "../../prisma";

interface listarEventosIdType {
    id: string;
   
}

class ListarEventoIdService {
    async execute({id}: listarEventosIdType){
        const listarEventoId = await prismaClient.eventos.findFirst({
            where: {
                id: id,
            },
            include: { 
               categorias: true,
           }
        })

        return listarEventoId

    }
}

export {ListarEventoIdService}