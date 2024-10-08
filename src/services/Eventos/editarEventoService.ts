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
  produto_id: string
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
    produto_id,
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
      },
    });
    return editar;
  }
}

export { EditarEventosService };
