import prismaClient from "../../prisma";

interface EditarCidadeType {
    id: string,
    nomeCidade: string,
    uf: string

}

class EditarCidadesService {
    async execute({ id, nomeCidade,uf }: EditarCidadeType){

         const editar = prismaClient.cidades.update({
             
            where:{
                id: id
            },

            data: {
               nomeCidade: nomeCidade,
               uf: uf     
            }

         })

         return editar

    }
}


export { EditarCidadesService }