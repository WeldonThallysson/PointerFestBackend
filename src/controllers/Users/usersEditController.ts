import { Request,Response } from "express";
import { UsersEditService } from "../../services/Users/usersEditService";
import { UploadedFile } from "express-fileupload";



class UsersEditController {
    async handle(req: Request, res:Response){
        const id_user_logged = req.user_id
        const {
            id,
            name,
            companyName,
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

        const profileAvatar = req.files.profileAvatar as UploadedFile
        //const files = req.files as {[filename: string]: Express.Multer.File[]}
         //const urlLogoUsuario = files['urlLogoUsuario']?.[0].filename;

        const usersEdit = new UsersEditService()
 
        const responseEdit = await usersEdit.execute({
            id,
            id_user_logged,
            name,
            companyName,
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
            profileAvatar,
            ...(status !== null && {status: status !== 'false' ? true : false})
            //urlLogoUsuario,
            
        })

        res.status(responseEdit?.data?.status).json(responseEdit?.data?.message)
    }

}


export {UsersEditController}