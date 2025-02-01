import prismaClient from "../../prisma";

interface CadastrarEventoType {
   nome: string;
   descricao: string;
   nomeLocalEvento: string;
   urlLocalizacaoEvento: string;
   bannerEvento: string;
   dataEvento: string;
   horarioEvento: string;
   categoria_id: string;
   locaisCompraIngresso?: string[];
   urlInstagramDoComerciante?: string;
   restricoesEvento?: string;
   telefone?: string;
   produto_id: string
   statusEvento: boolean
}

class CadastrarEventoService {
    async execute({
        nome,
        descricao,
        nomeLocalEvento,
        produto_id,
        urlLocalizacaoEvento,
        bannerEvento,
        dataEvento,
        horarioEvento,
        categoria_id,
        restricoesEvento,
        locaisCompraIngresso,
        urlInstagramDoComerciante,
        telefone,
        statusEvento,
 
    }: CadastrarEventoType){
        const eventoExiste = await prismaClient.eventos.findFirst({
            where: {
                nome: nome
            }
        })
        if(eventoExiste){
            return {
                message: "Essa evento já existe",
                status: 400
            }
        }
        const cadastrarEvento = await prismaClient.eventos.create({
            data:{
                nome: nome,
                descricao: descricao,
                produto_id: produto_id,
                nomeLocalEvento: nomeLocalEvento,
                urlLocalizacaoEvento: urlLocalizacaoEvento,
                bannerEvento: bannerEvento,
                dataEvento: dataEvento,
                horarioEvento: horarioEvento,
                categoria_id: categoria_id,
                restricoesEvento: restricoesEvento,
                locaisCompraIngresso: locaisCompraIngresso,
                urlPostRedeSocial: urlInstagramDoComerciante,
                telefone: telefone,
                statusEvento: Boolean(statusEvento),
            }
        })
        return cadastrarEvento;   
    } 



}

export {CadastrarEventoService}