import prismaClient from "../../prisma";


interface EditarCategoriasType {
    id: string,
    nomeCategoria: string
}

class EditarCategoriasService {
    async execute({id,nomeCategoria}: EditarCategoriasType){
        
        
        const editarCategoria = await prismaClient.categorias.update({
            where: {
                id: id
            },
            data: {
                nome: nomeCategoria
            }

        })

        if(nomeCategoria === editarCategoria.nome){
            throw new Error("Edite para outro nome,essa categoria já existe !")
        }

        if(nomeCategoria === ""){
            throw new Error("envie valores para a atualização")
        }

        return editarCategoria


    }

}

export {EditarCategoriasService}