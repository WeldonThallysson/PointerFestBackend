import prismaClient from "../../prisma";


interface EditarCategoriasType {
    id: string,
    name: string
    label?: string | null;
    icon?: string | null
    themeImageUrl?: string | null
}

class EditarCategoriasService {
    async execute({
        id,
        name,
        label,
        icon,
        themeImageUrl
    }: EditarCategoriasType){
        
        
        if(name === ""){
            throw new Error("envie valores para a atualização")
        }
        
        const editarCategoria = await prismaClient.categories.update({
            where: {
                id: id
            },
            
            data:{
                name: name,
                label: label,
                icon: icon,
                themeImageUrl: themeImageUrl
            }

        })


        return editarCategoria


    }

}

export {EditarCategoriasService}