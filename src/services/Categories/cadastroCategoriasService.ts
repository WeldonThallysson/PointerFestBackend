import prismaClient from "../../prisma";


interface CadastroCategoriaType {
    idUserOwner: string
    name: string
    label?: string | null;
    icon?: string | null
    themeImageUrl?: string | null
}

class CadastroCategoriasService {
    async execute({idUserOwner, name,label, icon,themeImageUrl}: CadastroCategoriaType){
           
        const categoriaExiste = await prismaClient.categories.findFirst({
            where: {
                name: name
            }
        })
        if(categoriaExiste){
            return {
                message: "Essa categoria já existe",
                status: 403
            }
        }
        
        const cadastroCategoria = await prismaClient.categories.create({
            data:{
                idUserOwner: idUserOwner,
                name: name,
                label: label ? label : null,
                icon: icon ? icon : null,
                themeImageUrl: themeImageUrl ? themeImageUrl : null,
              
            }
        })
      
        return cadastroCategoria;
    }
}

export {CadastroCategoriasService}

