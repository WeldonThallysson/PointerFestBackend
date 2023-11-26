import prismaClient from "../../prisma";

interface UsuariosType {
    usuario_id: string
}

class DetalhesUsuarioServices {

    async execute({usuario_id}: UsuariosType){
        const detalhesUsuarios = await prismaClient.usuarios.findFirst({
            where: {
                id: usuario_id
            },
            select: {
                id: true,
                nome: true,
                email: true,
                created_At: true,
                update_At: true

            }
        })

        return detalhesUsuarios
    }

}

export {DetalhesUsuarioServices}