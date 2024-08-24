import { Request, Response } from "express";
import { EditarEventosService } from "../../services/Eventos/editarEventoService";

class EditarEventoController {
  async handle(req: Request, res: Response) {
    const {
      id,
      nome,
      descricao,
      nomeLocalEvento,
      urlLocalizacaoEvento,
      dataEvento,
      horarioEvento,
      categoria_id,
      locaisCompraIngresso,
      urlInstagramDoComerciante,
      telefone,
      restricoesEvento,
      tipoVisibilidadeEvento,
      statusEvento,
    } = req.body;

    const { originalname, filename: bannerEvento } = req?.file;
    const editarEvento = new EditarEventosService();

    const eventoEditado = await editarEvento.execute({
      id,
      nome,
      descricao,
      nomeLocalEvento,
      urlLocalizacaoEvento,
      dataEvento,
      horarioEvento,
      categoria_id,
      restricoesEvento,
      tipoVisibilidadeEvento,
      statusEvento,
      locaisCompraIngresso,
      urlInstagramDoComerciante,
      telefone,
      bannerEvento,
    });

    return res.json(eventoEditado);
  }
}

export { EditarEventoController };
