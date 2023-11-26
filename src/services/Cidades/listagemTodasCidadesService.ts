import prismaClient from "../../prisma";


class ListagemTodasCidadesService {
    async execute(){
        
        const todasCidades = await prismaClient.cidades.findMany()

        return todasCidades

    }
}

export {ListagemTodasCidadesService}