import { Request, Response } from "express";
 
import { BinEditItemsService } from "../../services/Bin/binEditItemsService";

class BinEditItemsController {
  async handle(req: Request, res: Response) {
     
    const { 
        id,
        idUserOwner,
        tableName,
        data
    } = req.body;

    const binEditItemsService = new BinEditItemsService();

    const responseBinGetAllItemsService = await binEditItemsService.execute({
         id: id,
         idUserOwner: idUserOwner,
         tableName: tableName, 
         data: data
    });

    return res
      .status(responseBinGetAllItemsService.data.status)
      .json(responseBinGetAllItemsService.data);
  }
}

export { BinEditItemsController };
