import { Request,Response } from "express";
import { UsersEditService } from "../../services/Users/usersEditService";



class UsersEditController {
    async handle(req: Request, res:Response){
        const id_user_logged = req.user_id
        const {
            id,
      
        
            name,
            email,
            password,
            cpfCnpj,
            typePerson,
            birthDate,
            phone,
            gender,
        
            complement,
            street,
            city,
            cep,
            region_code,
            number_address,
            neighborhood,
            profileSocialUrl,
            status
        } = req.body
 
        //const files = req.files as {[filename: string]: Express.Multer.File[]}
         //const urlLogoUsuario = files['urlLogoUsuario']?.[0].filename;

        const usersEdit = new UsersEditService()
 
        const responseEdit = await usersEdit.execute({
            id,
            id_user_logged,
            name,
            email,
            password,
            cpfCnpj,
            typePerson,
            birthDate,
            phone,
            gender,

            complement,
            street,
            city,
            cep,
            region_code,
            number_address,
            neighborhood,
            profileSocialUrl,
            ...(status !== null && {status: status !== 'false' ? true : false})
            //urlLogoUsuario,
            
        })

        res.json(responseEdit)
    }

}


export {UsersEditController}