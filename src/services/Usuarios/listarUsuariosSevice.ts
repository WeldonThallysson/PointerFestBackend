import prismaClient from "../../prisma";


class ListarUsuariosService {
    async execute(){
        const users = await prismaClient.usuarios.findMany()

        console.log(users)
        return users
    }
}

export {ListarUsuariosService}