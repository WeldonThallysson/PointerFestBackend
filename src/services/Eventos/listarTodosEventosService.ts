import prismaClient from "../../prisma";

class ListarTodosEventosService {
    async execute(){
        const listarTodosEventos = await prismaClient.eventos.findMany({
            include: { 
                categorias: true,
                cidades: true
            }
 
        })

        return listarTodosEventos 

        
    }
}

export {ListarTodosEventosService}