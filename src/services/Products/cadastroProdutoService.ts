import prismaClient from "../../prisma";


interface ICadastroProduto {
    nome: string
    descricao: string
    preco: number
}
 
class CadastroProdutoService {
  async execute ({nome, descricao,preco}: ICadastroProduto) {
      const produtoExiste = await prismaClient.products.findFirst({
         where: {
            name: nome
         } 
      })

      if(produtoExiste){
         return {
            status: 400,
            message: "Esse nome de produto já existe, tente outro nome!"
         }
      }
   /*
      const produto = await prismaClient.products.create({
          data: {
             name: nome,
             description: descricao,
             price: preco,
             
          } 
      })    
     */ 
      return {
         status: 200,
         message: "Cadastrado realizado com sucesso",
      }
  }
}


export {CadastroProdutoService}