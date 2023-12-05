import prismaClient from "../../prisma";

interface CadastrarEventoType {
   nome: string;
   descricao: string;
   nomeLocalEvento: string;
   urlLocalizacaoEvento: string;
   bannerEvento: string;
   dataEvento: string;
   horarioEvento: string;
   categorias_id: string;
   cidades_id: string;
   locaisCompraIngresso?: string[];
   urlInstagramDoComerciante?: string;
   telefone?: string;

}

class CadastrarEventoService {
    async execute({
        nome,
        descricao,
        nomeLocalEvento,
        urlLocalizacaoEvento,
        bannerEvento,
        dataEvento,
        horarioEvento,
        categorias_id,
        cidades_id,
        locaisCompraIngresso,
        urlInstagramDoComerciante,
        telefone,
    }: CadastrarEventoType){
       
        const cadastrarEvento = await prismaClient.eventos.create({

            data:{
                nome: nome,
                descricao: descricao,
                nomeLocalEvento: nomeLocalEvento,
                urlLocalizacaoEvento: urlLocalizacaoEvento,
                bannerEvento: bannerEvento,
                dataEvento: dataEvento,
                horarioEvento: horarioEvento,
                categorias_id: categorias_id,
                cidades_id: cidades_id,
                locaisCompraIngresso: locaisCompraIngresso,
                urlInstagramDoComerciante: urlInstagramDoComerciante,
                telefone: telefone,
            }
        })
        return cadastrarEvento;   
    } 



}

export {CadastrarEventoService}