import prismaClient from "../../prisma";


class ListagemTodasCategoriasService {
     async execute(){
        const listagemCategorias = await prismaClient.categories.findMany()

        return listagemCategorias
     }

}

export {ListagemTodasCategoriasService}