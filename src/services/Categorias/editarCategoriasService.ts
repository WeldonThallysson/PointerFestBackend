import prismaClient from "../../prisma";


interface EditarCategoriasType {
    id: string,
    nome: string
    iconeCategoria?: string | null
    urlBannerCategoria?: string | null
}

class EditarCategoriasService {
    async execute({id,nome,iconeCategoria,urlBannerCategoria}: EditarCategoriasType){
        
        
        const editarCategoria = await prismaClient.categorias.update({
            where: {
                id: id
            },
            
            data:{
                nome: nome,
                ...(iconeCategoria && { iconeCategoria: iconeCategoria }),
                ...(urlBannerCategoria && {urlBannerCategoria: urlBannerCategoria})
            
            }

        })

        if(nome === ""){
            throw new Error("envie valores para a atualização")
        }

        return editarCategoria


    }

}

export {EditarCategoriasService}