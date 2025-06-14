import axios from "axios";
import {
  ICard,
  IDataUserPayer,
  IProduct,
} from "../../../interface/interface.checkoutPaymentMethod";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../../constants/configs/fetchConfig";
import {
  formatterTotalPrice,
  formatterTotalSomePrice,
} from "../../../utils/formatters/formatterTotalPrice";
import { separatePhoneNumber } from "../../../utils/formatters/formatterPhone";

interface IDebitPaymentMethodService {
  dataUserPayer: IDataUserPayer;
  cardData: ICard;
  products: IProduct[];
  id_authentication_method?: string | null;
}

class DebitPaymentMethodService {
  async execute({
    dataUserPayer,
    products,
    cardData,
    id_authentication_method,
  }: IDebitPaymentMethodService) {
    if (!id_authentication_method) {
      return {
        data: {
          message:
            "Envie o id_authentication_method para prosseguir com o pagamento de cartão débito",
        },
      };
    }

    if (
      !cardData.exp_month ||
      !cardData.exp_year ||
      !cardData.security_code ||
      !cardData.number ||
      !cardData.holder.name ||
      !cardData.holder.tax_id
    ) {
      return {
        data: {
          message:
            "Verifique e preencha todos os campos de dados do cartão corretamente!",
          status: 400,
        },
      };
    }

    // Separar o número de telefone
    let phoneFormatted;
    try {
      phoneFormatted = separatePhoneNumber(dataUserPayer.phone); // Supondo que o número de telefone está em dataUserPayer.phone
    } catch (error) {
      return {
        data: {
          message: error.message,
          status: 400,
        },
      };
    }

    const data = {
      reference_id: uuidv4(),
      customer: {
        name: dataUserPayer.name,
        email: dataUserPayer.email,
        tax_id: dataUserPayer.cpf,
        phones: [
          {
            country: phoneFormatted.country, // Usar o país separado
            area: phoneFormatted.area, // Usar a área separada
            number: phoneFormatted.number, // Usar o número separado
            type: "MOBILE",
          },
        ],
      },
      items: products.map((item) => ({
        reference_id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit_amount: item.price,
      })),
      billingAddress: {
        address: {
          street: dataUserPayer.neighborhood ?? "",
          number: dataUserPayer.number_address ?? "",
          complement: dataUserPayer.residence ?? "",
          locality: dataUserPayer.neighborhood ?? "",
          city: dataUserPayer.city ?? "",
          region_code: dataUserPayer.region_code ?? "SC",
          country: "BRA",
          postal_code: dataUserPayer.cep ?? "",
        },
      },
      notification_urls: [
        `${process.env.BACKEND_URL}/checkoutpayments/api/statuspayment`,
      ],
      charges: [
        {
          reference_id: uuidv4(),
          description: "Compra de Passaportes Resort dos Canyons",
          amount: {
            value: formatterTotalSomePrice(products),
            currency: "BRL",
          },
          payment_method: {
            type: "DEBIT_CARD",
            installments: 1,
            capture: true,
            soft_descriptor: "ResortPass",
            card: {
              number: cardData.number,
              exp_month: cardData.exp_month,
              exp_year: cardData.exp_year,
              security_code: cardData.security_code,
              holder: {
                name: cardData.holder.name,
                tax_id: cardData.holder.tax_id,
              },
            },
            authentication_method: {
              type: "THREEDS",
              id: id_authentication_method,
            },
          },
        },
      ],
    };
    console.log(JSON.stringify(data));
    let responseDebit = await api({
      method: "POST",
      endpoint: "/orders",
      data: JSON.stringify(data),
    });

    return {
      data: {
        items: responseDebit,
        errors: responseDebit.error_messages,
        codeError: "Ocorreu erros na API PAGBANK referente ao cartão de débito",
        message: responseDebit.error_messages
          ? "Ops, Ocorreu um erro. Se algum dado seu estiver incompleto ou incorreto, verifique e atualize suas informações. Isso é necessário para prosseguir com o pagamento via cartão de débito."
          : "Checkout com débito gerado com sucesso!",
        status: responseDebit.error_messages ? 400 : 200,
      },
    };
  }
}

export { DebitPaymentMethodService };
