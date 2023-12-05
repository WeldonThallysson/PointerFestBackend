import prismaClient from "../../prisma";


interface EditarCategoriasType {
    id: string,
    nome: string
}

class EditarCategoriasService {
    async execute({id,nome}: EditarCategoriasType){
        
        
        const editarCategoria = await prismaClient.categorias.update({
            where: {
                id: id
            },
            data: {
                nome: nome
            }

        })

        if(nome === ""){
            throw new Error("envie valores para a atualização")
        }

        return editarCategoria


    }

}

export {EditarCategoriasService}