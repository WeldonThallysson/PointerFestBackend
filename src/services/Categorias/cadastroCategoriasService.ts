import prismaClient from "../../prisma";


interface CadastroCategoriaType {
    nomeCategoria: string
}

class CadastroCategoriasService {
    async execute({nomeCategoria}: CadastroCategoriaType){
        const cadastroCategoria = await prismaClient.categorias.create({
            data:{
                nome: nomeCategoria,
            }
        })
     
        if(nomeCategoria === cadastroCategoria.nome){
            throw new Error("Não é permitido cadastrar categorias com o mesmo nome")
        }
        return cadastroCategoria;
    }
}

export {CadastroCategoriasService}

