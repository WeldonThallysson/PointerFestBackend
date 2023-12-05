import prismaClient from "../../prisma";


interface CadastroCategoriaType {
    nome: string
}

class CadastroCategoriasService {
    async execute({nome}: CadastroCategoriaType){
           
     
        const cadastroCategoria = await prismaClient.categorias.create({
            data:{
                nome: nome,
            }
        })
      
        return cadastroCategoria;
    }
}

export {CadastroCategoriasService}

