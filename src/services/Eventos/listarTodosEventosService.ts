import prismaClient from "../../prisma";

class ListarTodosEventosService {
    async execute(){
        const listarTodosEventos = await prismaClient.eventos.findMany({
            include: { 
                categorias: true,
            }
 
        })

        return listarTodosEventos 

        
    }
}

export {ListarTodosEventosService}