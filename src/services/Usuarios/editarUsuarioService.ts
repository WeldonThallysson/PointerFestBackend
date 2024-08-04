import prismaClient from "../../prisma";


interface IEditarUsuarioService {
    id: string
    nome: string 
    email: string
    senha: string
    cpfCnpj: string
    dataNascimento?: string
    endereco?: string
    telefone?: string
    urlRedeSocial?: string
    urlLogoUsuario?: string
    
}
class EditarUsuarioService {
    async execute({
        id,
        nome,
        email,
        senha,
        cpfCnpj,
        dataNascimento,
        endereco,
        telefone,
        urlRedeSocial,
        urlLogoUsuario,
    }: IEditarUsuarioService){

        if(nome === "" || email === "" || senha === "" || cpfCnpj === ""){
            throw new Error("Error: Informe os dados obrigatórios (nome,email,senha, CPF ou CNPJ)")
        }

        const editarUsuario = await prismaClient.usuarios.update({
           where:{
             id: id
           },

           data: {
            nome: nome,
            email: email,
            senha: senha,
            cpfCnpj: cpfCnpj,
            dataNascimento:dataNascimento,
            endereco: endereco,
            telefone: telefone,
            urlRedeSocial: urlRedeSocial,
            urlLogoUsuario: urlLogoUsuario,
             
           }
            
        })

        return editarUsuario



    }
}

export {EditarUsuarioService}




