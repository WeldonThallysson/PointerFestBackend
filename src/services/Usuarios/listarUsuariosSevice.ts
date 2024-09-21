import prismaClient from "../../prisma";


class ListarUsuariosService {
    async execute(){
        const users = await prismaClient.usuarios.findMany()

        return users
    }
}

export {ListarUsuariosService}