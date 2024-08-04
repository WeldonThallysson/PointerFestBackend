import prismaClient from "../../prisma";


interface CadastroCategoriaType {
    nome: string
    iconeCategoria: string
    urlBannerCategoria: string
}

class CadastroCategoriasService {
    async execute({nome,iconeCategoria,urlBannerCategoria}: CadastroCategoriaType){
           
     
        const cadastroCategoria = await prismaClient.categorias.create({
            data:{
                nome: nome,
                iconeCategoria: iconeCategoria,
                urlBannerCategoria: urlBannerCategoria
            }
        })
      
        return cadastroCategoria;
    }
}

export {CadastroCategoriasService}

