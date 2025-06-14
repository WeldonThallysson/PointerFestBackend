import { Request, Response } from "express";
import { RegisterPassportService } from "../../services/Passports/registerPassaportService";
import { RegisterVoucherService } from "../../services/Vouchers/registerVoucherService";
import { GetDispatchVouchersForEmailsService } from "../../services/Vouchers/getDispatchVouchersForEmailsService";
import { IProductResponse } from "../../interface/interface.checkoutPaymentMethod";
import prismaClient from "../../prisma";

class CheckoutStatusPaymentController {
  async handle(req: Request, res: Response) {
    const registerPassportService = new RegisterPassportService();
    const registerVoucherService = new RegisterVoucherService();
    const getDispatchVouchersForEmails = new GetDispatchVouchersForEmailsService()
 
    const notificationData = req.body;
    const lastCharge = notificationData.charges?.[notificationData.charges.length - 1];

    const orderId = notificationData.reference_id;
    const status = lastCharge?.status;
    const datePayment = lastCharge?.paid_at;
    const codePayment = lastCharge?.id;
    
    console.log("==============================");
    console.log(notificationData);

    // Verifica se já existe um voucher com esse código de pagamento
    const verifyVoucherExists = await prismaClient.purchases.findFirst({
      where: {
        OR: [
          { codePayment: codePayment }, // Garante que o pagamento foi único
          { codeReferencePayment: orderId } // Garante que o pedido não gerou múltiplos vouchers
        ]
      }
    });

    if (verifyVoucherExists) {
     /* esse console foi criado devido a um error da API Pagbank, no retorno do webhook 
      ela retorna varias vezes e este é um bloqueio verificando se ja foi pago */
      console.log(`O pagamento ${codePayment} já foi processado. Ignorando duplicação.`); 
      return; 
    }


    if (status === "PAID") {
      console.log(`O pedido ${orderId} foi pago.`);

      // Iterar pelos itens e registrar os passaportes
      for (const item of notificationData.items) {
        const { reference_id, name, quantity, unit_amount } = item;
        
        for (let i = 0; i < quantity; i++) {
          try {
            const result = await registerPassportService.execute({
              nameProduct: name,
              idReferenceProduct: reference_id,
              price: unit_amount, // Converter centavos para reais
              cpfUser: notificationData.customer.tax_id,
              typeMethodPayment: lastCharge.payment_method?.type,
              codePayment: codePayment,
              codeReferencePayment: orderId,
              datePayment: datePayment,
         
              statusPayment: status,
            });

            console.log(result.data.message); // Log de sucesso para cada passaporte
          } catch (error) {
            console.error(
              `Erro ao registrar passaporte para ${name}:`,
              error.message
            );
          }
        }
      }

      const productsFormattedVoucher = notificationData?.items?.map((item: IProductResponse) => {
        return {
          id: item?.reference_id,
          name: item?.name,
          price: item?.unit_amount,
          totalPriceIndividual: item.quantity * item.unit_amount,
          quantity: item?.quantity,
        };
      });
      
 
      const resultGenerateVoucher = await registerVoucherService.execute({
        products: productsFormattedVoucher,
        cpfUser: notificationData.customer.tax_id,
        codePayment: codePayment,
        codeReferencePayment: orderId,
        datePayment: datePayment,
        totalPrice: lastCharge?.amount?.value,
        typeMethodPayment: lastCharge?.payment_method?.type,
      });

      console.log(resultGenerateVoucher.data.message); 

      const resultSendVouchersForEmails = await getDispatchVouchersForEmails.execute({
        idVoucher: resultGenerateVoucher.data.id,
        idUserLogged: resultGenerateVoucher.data.userId
      })

      console.log(resultSendVouchersForEmails.data.message)
    } else {
      console.log(`O pedido ${orderId} ainda não foi pago.`);
    }

    // Retorne uma resposta 200 OK para o PagSeguro
    return res.status(200).json({
      data: notificationData,
      message: "Notificação recebida com sucesso.",
    });
  }
}

export { CheckoutStatusPaymentController };
