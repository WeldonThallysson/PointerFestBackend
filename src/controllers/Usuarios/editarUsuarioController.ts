import { Request,Response } from "express";
import { EditarUsuarioService } from "../../services/Usuarios/editarUsuarioService";



class EditarUsuarioController {
    async handle(req: Request, res:Response){
        const {id} = req.params

        const {
            nome,
            email,
            senha,
            cpfCnpj,
            dataNascimento,
            endereco,
            telefone,
            urlRedeSocial,
        } = req.body
        
        const files = req.files as {[filename: string]: Express.Multer.File[]}
        const urlLogoUsuario = files['urlLogoUsuario']?.[0].filename;

        const editarUsuario = new EditarUsuarioService()
       
        if(nome === "" || email === "" || senha === "" || cpfCnpj === ""){
            res.status(401).json({
                status: 401,
                message: "Error: Informe os dados obrigatórios (nome,email, senha, CPF ou CNPJ)",
            })
            return;
        }

        const responseEdit = await editarUsuario.execute({
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
            
        })

        res.json(responseEdit)
    }

}


export {EditarUsuarioController}