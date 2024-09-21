import prismaClient from "../../prisma";


interface ICadastroProduto {
    nome: string
    descricao: string
}
 
class CadastroProdutoService {
  async execute ({nome, descricao}: ICadastroProduto) {
      const produtoExiste = await prismaClient.produtos.findFirst({
         where: {
            nome: nome
         } 
      })

      if(produtoExiste){
         return {
            status: 400,
            message: "Esse nome de produto já existe tente outro nome"
         }
      }

      const produto = await prismaClient.produtos.create({
          data: {
             nome: nome,
             descricao: descricao
          } 
      })    
      
      return produto
  }
}


export {CadastroProdutoService}