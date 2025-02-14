import prismaClient from "../../prisma";

interface ICategoriesGetAllService {
  name?: string | null;
  label?: string | null;
  page?: number | null;
  limit?: number | null;
}

class CategoriesGetAllService {
  async execute({ name, label,page, limit }: ICategoriesGetAllService) {
    const where: any = "";

    if (name) where.name = { contains: name, mode: "insensitive" };
    if (label) where.label = { contains: label, mode: "insensitive" };


   const shouldPaginate = page !== undefined || limit !== undefined;
   const skip = shouldPaginate ? ((page ?? 1) - 1) * (limit ?? 10) : undefined;
   const take = shouldPaginate ? limit ?? 10 : undefined

    const categories = await prismaClient.categories.findMany({
      where,
      skip,
      take,
      orderBy: { created_At: "desc" },
  
    });

    const totalCategories = await prismaClient.categories.count()
    const totalPages = shouldPaginate ? Math.ceil(totalCategories / (limit ?? 10)) : 1

    

    return {
      items: categories,
      totalItems: totalCategories,
      totalPages: totalPages,
      currentPage: shouldPaginate ? page ?? 1 : 1,
      status: 200,
    }
   
    
   }
}

export { CategoriesGetAllService };
