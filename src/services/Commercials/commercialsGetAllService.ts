import prismaClient from "../../prisma";

interface ICommercialGetAllService {
  name?: string | null;
  description?: string | null;
  page?: number | null;
  limit?: number | null;
}

class CommercialGetAllService {
  async execute({ name, description,page, limit }: ICommercialGetAllService) {
    const where: any = "";

    if (name) where.name = { contains: name, mode: "insensitive" };
    if (description) where.description = { contains: description, mode: "insensitive" };


   const shouldPaginate = page !== undefined || limit !== undefined;
   const skip = shouldPaginate ? ((page ?? 1) - 1) * (limit ?? 10) : undefined;
   const take = shouldPaginate ? limit ?? 10 : undefined

    const commercials = await prismaClient.commercials.findMany({
      where,
      skip,
      take,
      orderBy: { created_At: "desc" },
  
    });

    const totalCommercials = await prismaClient.commercials.count()
    const totalPages = shouldPaginate ? Math.ceil(totalCommercials / (limit ?? 10)) : 1

    return {
      items: commercials,
      totalItems: totalCommercials,
      totalPages: totalPages,
      currentPage: shouldPaginate ? page ?? 1 : 1,
      status: 200,
    }
   
    
   }
}

export { CommercialGetAllService };
