import prismaClient from "../../prisma";

interface DeletarUsuariosType {
    id: string 
}

class DeletarUsuariosService {
    async execute({id}: DeletarUsuariosType){
        const deletarUsuario = await prismaClient.usuarios.delete({
            where: {
                id: id,
            }
        })

        return deletarUsuario;

    }

}


export { DeletarUsuariosService }
