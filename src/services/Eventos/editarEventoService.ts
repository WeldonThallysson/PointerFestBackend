import prismaClient from "../../prisma";

interface EditarEventoServiceType {
  id: string;
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
  tipoVisibilidadeEvento: string
  statusEvento: boolean
}

class EditarEventosService {
  async execute({
    id,
    nome,
    descricao,
    nomeLocalEvento,
    urlLocalizacaoEvento,
    bannerEvento,
    dataEvento,
    horarioEvento,
    categoria_id,
    locaisCompraIngresso,
    urlInstagramDoComerciante,
    telefone,
    tipoVisibilidadeEvento,
    restricoesEvento,
    statusEvento,
  }: EditarEventoServiceType) {
    const editar = await prismaClient.eventos.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        descricao: descricao,
        tipoVisibilidadeEvento: tipoVisibilidadeEvento,
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
        statusEvento: statusEvento,
      },
    });
    return editar;
  }
}

export { EditarEventosService };
