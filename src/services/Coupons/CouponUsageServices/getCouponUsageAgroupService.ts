import prismaClient from "../../../prisma";
import { todayFormattedWithTime, todayFormattedWithTimeToIso, todayWithTimeAtFormat } from "../../../utils/formatters/formatterToday";

interface IGetCouponUsageAgroupService {
  idCouponUsed: string | null;
}

class GetCouponUsageAgroupService {
  async execute({ idCouponUsed }: IGetCouponUsageAgroupService) {
    const whoUsedCupom = await prismaClient.couponUsage.findMany({
      where: {
        idCouponUsed: idCouponUsed,
      },
      select: {
        id: true,
        idCouponUsed: true,
        idUserOwner: true,
        dateLastPaymentComissionCoupon: true,
        statusComissionPaid: true,
        
        coupon: {
          select: {
            id: true,
            commissionPromoter: true,
            codeCoupon: true,
            priceDiscount: true,
            
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            cpfCnpj: true,
            email: true,
            typeAccess: true,
            gender: true,
            phone: true,
            birthDate: true,
          },
        },
        created_At: true,
      },
      orderBy: {
        created_At: 'asc', // Ordenar pela data de criação, do mais recente para o mais antigo
      }
    });

    const groupedData = whoUsedCupom.reduce((acc, usage) => {
      const {
        id,
        idUserOwner,
        idCouponUsed,
        coupon,
        user,
        statusComissionPaid,
        dateLastPaymentComissionCoupon,
        created_At,
      } = usage;
    
      // Verificar se os valores obrigatórios existem
      if (!idUserOwner || !idCouponUsed) {
        console.error("Dados inválidos:", usage);
        return acc;
      }
    
      // Procurar ou criar um índice para o agrupamento
      let existingEntry = acc.find(
        (item) =>
          item.idUserOwner === idUserOwner && item.idCouponUsed === idCouponUsed
      );
         
      const dateUsedCoupon = todayWithTimeAtFormat(created_At); 
      
      if (!existingEntry) { 
        existingEntry = {
          idUserOwner,
          idCouponUsed,
          coupon,
          user,
          quantityUsed: 0,
          quantityPaid: 0,
          quantityUnpaid: 0,
          dateUsedCoupon,
          couponsUsed: [],
          created_At, 
        };

        acc.push(existingEntry);
      }
     
      existingEntry.couponsUsed.push({
        id,
        idUserOwner,
        idCouponUsed,
        coupon,
        user,
        statusComissionPaid,
        dateLastPaymentComissionCoupon,
        dateUsedCoupon,  
        created_At,
      });
    
      existingEntry.quantityUsed += 1;
      if (statusComissionPaid) {
        existingEntry.quantityPaid += 1;
      } else {
        existingEntry.quantityUnpaid += 1;
      }
    
      return acc;
    }, []);

    groupedData.forEach((group) => {
      group.couponsUsed.sort((a: any, b: any) => { 
        if (a.statusComissionPaid === null || a.statusComissionPaid === false) return -1;
        if (b.statusComissionPaid === null || b.statusComissionPaid === false) return 1;
     
        if (a.dateLastPaymentComissionCoupon === null) return 1;
        if (b.dateLastPaymentComissionCoupon === null) return -1;
     
        const dateA = todayFormattedWithTimeToIso(new Date(a.dateLastPaymentComissionCoupon));
        const dateB = todayFormattedWithTimeToIso(new Date(b.dateLastPaymentComissionCoupon));
     
        return dateB.localeCompare(dateA);
      });
    });

    groupedData.sort((a, b) => {
      
      return b.created_At - a.created_At;
    });
    return {
      data: {
        items: groupedData,
        status: 200,
      },
    };
  }
}

export { GetCouponUsageAgroupService };
