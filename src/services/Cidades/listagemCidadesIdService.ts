import prismaClient from "../../prisma";

interface CidadesIdTypes {
    idCidade: string,
}


class ListagemCidadesIdService {
    async execute({idCidade}: CidadesIdTypes){
        const listagemId = await prismaClient.cidades.findFirst({
            where: {
                id: idCidade,
            }
        }) 

        return listagemId

    }   
}

export { ListagemCidadesIdService }