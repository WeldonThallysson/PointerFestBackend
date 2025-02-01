import prismaClient from "../../prisma";

interface IListarTodosEventosService {
    nome: string
}
class ListarTodosEventosService {
    async execute({nome}: IListarTodosEventosService){
        const listarTodosEventos = await prismaClient.eventos.findMany({
            where: {
                ...(nome && {
                    nome: {
                        contains: nome,
                        mode: "insensitive",
                    }
                })
            },
            include: { 
                categorias: true,
            }
 
        })

        return listarTodosEventos 

        
    }
}

export {ListarTodosEventosService}