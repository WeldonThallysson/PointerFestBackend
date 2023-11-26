import prismaClient from "../../prisma";

interface CadastroCidadesType {
    nomeCidade: string,
    uf: string
}

class CadastroCidadesService {
    async execute({nomeCidade,uf}: CadastroCidadesType){

        const cidade = await prismaClient.cidades.create({
            data: {
                nomeCidade: nomeCidade,
                uf: uf
            }
        })
        if(nomeCidade === cidade.nomeCidade){
            throw new Error("não é permitido cadastrar cidades do mesmo nome")
         }
         
        return cidade;
    }
}

export {CadastroCidadesService}