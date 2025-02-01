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
        return {
            message: `Evento deletado com sucesso`,
            evento: deletarEvento.id,
            status: 200
        }
    }
}

export {DeletarEventoService}