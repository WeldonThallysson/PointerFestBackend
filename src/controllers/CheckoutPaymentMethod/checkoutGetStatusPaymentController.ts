import { Request, Response } from "express";
import { api } from "../../config/fetchConfig";

class CheckoutGetStatusPaymentController {
  async handle(req: Request, res: Response) {
    const {id} = req.params;

    if(!id){
       return res.status(400).json({
          message: "Envie o id do pedido para realizar esta ação (idOrder)",
          status:400,
       })
    }
    const responseGetStatusPayment = await api({
       method: "GET",
       endpoint: `/orders/${id}`
    })

    // Retorne uma resposta 200 OK para o PagSeguro
    return res.status(200).json({
      data: responseGetStatusPayment,
      message: "Busca pelo status da compra realizada com sucesso.",
    });
  }
}

export { CheckoutGetStatusPaymentController };
