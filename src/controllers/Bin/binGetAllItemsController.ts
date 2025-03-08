import { Request, Response } from "express";

import { BinGetAllItemsService } from "../../services/Bin/binGetAllItemsService";

class BinGetAllItemsController {
  async handle(req: Request, res: Response) {
    const { tableName, idUserOwner, page, limit } = req.body;

    const binGetAllItemsService = new BinGetAllItemsService();

    const responseBinGetAllItemsService = await binGetAllItemsService.execute({
      idUserOwner: idUserOwner,
      tableName: tableName,
      page: Number(page),
      limit: Number(limit),
    });

    return res
      .status(responseBinGetAllItemsService.data.status)
      .json(responseBinGetAllItemsService.data);
  }
}

export { BinGetAllItemsController };
