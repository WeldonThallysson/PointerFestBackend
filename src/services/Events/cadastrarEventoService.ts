import prismaClient from "../../prisma";

interface CadastrarEventoType {
  idUserOwner: string;
  idProduct: string;
  name: string;
  description: string;
  localityEvent: string;
  urlLocalityEvent: string;
  bannerImageUrl: string;
  dateEvent: string;
  hourEvent: string;
  idCategory: string; 
  restrictionsEvent?: string;
  placesPurchaseTicket: string;
  urlPostSocialNetwork: string;
  phoneForContact?: string;
}

class CadastrarEventoService {
  async execute({
    idUserOwner,
    idProduct,
    idCategory,
    name,
    description,
    localityEvent,
    urlLocalityEvent,
    bannerImageUrl,
    dateEvent,
    hourEvent,
    restrictionsEvent,
    placesPurchaseTicket,
    urlPostSocialNetwork,
    phoneForContact,
  }: CadastrarEventoType) {


    //idUserOwner



    const eventoExiste = await prismaClient.events.findFirst({
      where: {
        name: name,
      },
    });
    if (eventoExiste) {
      return {
        message: "Essa evento já existe",
        status: 400,
      };
    }
    const cadastrarEvento = await prismaClient.events.create({
      data: {
        idUserOwner: idUserOwner,
        name: name,
        description: description,
        idProduct: idProduct,
        idCategory: idCategory,
        localityEvent: localityEvent,
        urlLocalityEvent: urlLocalityEvent,
        bannerImageUrl: bannerImageUrl,
        dateEvent: dateEvent,
        hourEvent: hourEvent,

        restrictionsEvent: restrictionsEvent,
        placesPurchaseTicket: placesPurchaseTicket,
        urlPostSocialNetwork: urlPostSocialNetwork,
        phoneForContact: phoneForContact,
      },
    });
    return cadastrarEvento;
  }
}

export { CadastrarEventoService };
