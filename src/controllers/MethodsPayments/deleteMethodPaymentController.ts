import { Request, Response } from "express";
import { DeleteMethodPaymentService } from "../../services/MethodsPayments/deleteMethodPaymentService";

class DeleteMethodPaymentController {
  async handle(req: Request, res: Response) {
    const id_user_logged = req.user_id;
    const { id } = req.params;
    const deleteMethodPayment = new DeleteMethodPaymentService();
  
    const responseDeleteMethodPayment = await deleteMethodPayment.execute({
      id,
      id_user_logged
    });

    return res
      .status(responseDeleteMethodPayment.data.status)
      .json(responseDeleteMethodPayment.data);
  }
}

export { DeleteMethodPaymentController };
