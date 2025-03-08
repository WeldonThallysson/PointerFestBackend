import { Request, Response } from "express";
import { BinDeleteItemsService } from "../../services/Bin/binDeleteItemsService";

class BinDeleteItemsController {
  async handle(req: Request, res: Response) {
     
    const { 
        id,
    } = req.params;

    const binDeleteItemsService= new BinDeleteItemsService();

    const responseBinGetAllItemsService = await binDeleteItemsService.execute({
          id: id,
    });

    return res
      .status(responseBinGetAllItemsService.data.status)
      .json(responseBinGetAllItemsService.data);
  }
}

export { BinDeleteItemsController };
