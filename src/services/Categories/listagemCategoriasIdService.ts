import prismaClient from "../../prisma";

interface ListagemCategoriasIdType {
    id: string
}

class ListagemCategoriasIdService {
    async execute({id}: ListagemCategoriasIdType){
        if(!id){
            throw new Error("Error id da categoria não enviado")
        }
        const listagemCategorias = await prismaClient.categorias.findFirst({
            where: {
                id: id
            }
        })

        return listagemCategorias
       
    }
}

export {ListagemCategoriasIdService}