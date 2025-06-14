import axios from "axios";
import { Request, response, Response } from "express";
import { IMethodPaymentService, IProduct } from "../../../interface/interface.checkoutPaymentMethod";
import { v4 as uuidv4 } from 'uuid';
import { api } from "../../../config/fetchConfig";
import { formatterTotalSomePrice } from "../../../utils/formatters/formatterTotalPrice";
import { separatePhoneNumber } from "../../../utils/formatters/formatterPhone"; // Importar a função

interface IPixPaymentMethodService {
    dataUserPayer: {
        id: string;
        name: string;
        email: string;
        cpf: string;
        phone: string; // Adicione esta propriedade para o número de telefone
        birthDate: string;
        residence: string;
        neighborhood: string;
        address: string;
        city: string;
        gender: string;
        number_address: string;
        region_code: string;
        cep: string;
    },
    products: IProduct[],
}

class PixPaymentMethodService {
    async execute({ dataUserPayer, products }: IPixPaymentMethodService) {
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
                tax_id: dataUserPayer.cpf, // cpf
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

            qr_codes: [
                {
                    amount: {
                        value: formatterTotalSomePrice(products),
                    },
                    // "expiration_date": "2021-08-29T20:15:59-03:00",
                },
            ],
            billingAddress: {
                address: {
                    street: dataUserPayer.neighborhood ?? '',
                    number: dataUserPayer.number_address ?? '',
                    complement: dataUserPayer.residence ?? '',
                    locality: dataUserPayer.neighborhood ?? '',
                    city: dataUserPayer.city ?? '',
                    region_code: dataUserPayer.region_code ?? 'SC',
                    country: "BRA",
                    postal_code: dataUserPayer.cep ?? '',
                },
            },
            notification_urls: [
                `${process.env.BACKEND_URL}/checkoutpayments/api/statuspayment`,
            ],
        };

        console.log(JSON.stringify(data))

        let responsePix = await api({
            method: 'POST',
            endpoint: '/orders',
            data: JSON.stringify(data),
        });


        return {
            data: {
                items: responsePix,
                errors: responsePix.error_messages,
                codeError: "Ocorreu erros na API PAGBANK referente ao Pix",
                message: responsePix.error_messages ? "Ops, Ocorreu um erro. Se algum dado seu estiver incompleto ou incorreto, verifique e atualize suas informações. Isso é necessário para prosseguir com o pagamento via Pix." : "Pix gerado com sucesso!",
                status: responsePix.error_messages ? 400 : 201,
            },
        };
    }
}

export { PixPaymentMethodService };
