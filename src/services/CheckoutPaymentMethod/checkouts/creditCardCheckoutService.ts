import { api } from "../../../constants/configs/fetchConfig";
import {
  ICard,
  IDataUserPayer,
  IProduct,
} from "../../../interface/interface.checkoutPaymentMethod";
import { v4 as uuidv4 } from "uuid";
import { formatterTotalSomePrice } from "../../../utils/formatters/formatterTotalPrice";
import { separatePhoneNumber } from "../../../utils/formatters/formatterPhone"; // Importar a função

interface ICreditPaymentMethodService {
  dataUserPayer: IDataUserPayer;
  cardData: ICard;
  products: IProduct[];
}

class CreditPaymentMethodService {
  async execute({
    dataUserPayer,
    products,
    cardData,
  }: ICreditPaymentMethodService) {
    // Validação dos dados do cartão
    if (
      !cardData.encrypted ||
      !cardData.installments ||
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

    // Separar o número de telefone usando a função criada
    let phoneParts;
    try {
      phoneParts = separatePhoneNumber(dataUserPayer.phone);
    } catch (error) {
      return {
        data: {
          message: error.message, // Mensagem de erro personalizada
          status: 400,
        },
      };
    }

    // Construindo o objeto de dados
    const data = {
      reference_id: uuidv4(),
      customer: {
        name: dataUserPayer.name,
        email: dataUserPayer.email,
        tax_id: dataUserPayer.cpf,
        phones: [
          {
            country: phoneParts.country,
            area: phoneParts.area,
            number: phoneParts.number,
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
            value: formatterTotalSomePrice(products), // Valor total em centavos (R$ 50,00)
            currency: "BRL",
          },
          payment_method: {
            type: "CREDIT_CARD", // Aceitar apenas cartão
            installments: cardData.installments ?? 12, // Número de parcelas
            capture: true, // Captura automática do pagamento
            soft_descriptor: "ResortPass", // Nome que aparece na fatura
            card: {
              encrypted: cardData.encrypted,
              store: cardData.store ?? false,
            },
            holder: {
              name: cardData.holder.name, // Nome do titular do cartão
              tax_id: cardData.holder.tax_id, // CPF do titular do cartão
            },
          },
        },
      ],
    };
    console.log(JSON.stringify(data));
    // Realiza a chamada à API
    let responseCredit = await api({
      method: "POST",
      endpoint: "/orders",
      data: JSON.stringify(data),
    });

    return {
      data: {
        items: responseCredit,
        errors: responseCredit.error_messages,
        codeError:
          "Ocorreu erros na API PAGBANK referente ao cartão de crédito",
        message: responseCredit.error_messages
          ? "Ops, Ocorreu um erro. Se algum dado seu estiver incompleto ou incorreto, verifique e atualize suas informações. Isso é necessário para prosseguir com o pagamento via cartão de crédito."
          : "Checkout com crédito gerado com sucesso!",
        status: responseCredit.error_messages ? 400 : 200,
      },
    };
  }
}

export { CreditPaymentMethodService };
