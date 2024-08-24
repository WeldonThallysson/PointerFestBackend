import prismaClient from "../../prisma";


interface CadastroCategoriaType {
    nome: string
    iconeCategoria?: string | null
    urlBannerCategoria?: string | null
}

class CadastroCategoriasService {
    async execute({nome,iconeCategoria,urlBannerCategoria}: CadastroCategoriaType){
           
        const categoriaExiste = await prismaClient.categorias.findFirst({
            where: {
                nome: nome
            }
        })
        if(categoriaExiste){
            return {
                message: "Essa categoria já existe",
                status: 403
            }
        }
        
        const cadastroCategoria = await prismaClient.categorias.create({
            data:{
                nome: nome,
                ...(iconeCategoria && { iconeCategoria: iconeCategoria }),
                ...(urlBannerCategoria && {urlBannerCategoria: urlBannerCategoria})
            
            }
        })
      
        return cadastroCategoria;
    }
}

export {CadastroCategoriasService}

