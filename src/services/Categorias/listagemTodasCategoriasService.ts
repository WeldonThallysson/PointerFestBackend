import prismaClient from "../../prisma";


class ListagemTodasCategoriasService {
     async execute(){
        const listagemCategorias = await prismaClient.categorias.findMany()

        return listagemCategorias
     }

}

export {ListagemTodasCategoriasService}