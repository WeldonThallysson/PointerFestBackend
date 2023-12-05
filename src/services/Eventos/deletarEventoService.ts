import prismaClient from "../../prisma";


interface DeletarEventoIdType {
   id: string
}


class DeletarEventoService {
    async execute({id}: DeletarEventoIdType){
        const deletarEvento = await prismaClient.eventos.delete({
            where: {
                id: id
            }
        })    
        return deletarEvento
    }
}

export {DeletarEventoService}