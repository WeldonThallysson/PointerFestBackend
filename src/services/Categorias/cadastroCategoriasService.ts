import prismaClient from "../../prisma";


interface CadastroCategoriaType {
    nome: string
    iconeCategoria?: string | null
    urlBannerCategoria?: string | null
}

class CadastroCategoriasService {
    async execute({nome,iconeCategoria,urlBannerCategoria}: CadastroCategoriaType){
           
     
        const cadastroCategoria = await prismaClient.categorias.create({
            data:{
                nome: nome,
                ...(iconeCategoria && {ìconeCategoria: iconeCategoria}),
                ...(urlBannerCategoria && {urlBannerCategoria: urlBannerCategoria})
            
            }
        })
      
        return cadastroCategoria;
    }
}

export {CadastroCategoriasService}

