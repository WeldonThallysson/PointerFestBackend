import { Request,Response } from "express";
import { UsersRegisterService } from "../../../services/Users/Auth/usersRegisterService";


class UsersRegisterController {
    async handle(req: Request, res: Response){
        const {
            name,
            companyName,
            email,
            cpfCnpj,
            typePerson,
            password,
            birthDate,
            gender,
            phone,
            termsUsePlatform,
            termsUseLGPD,
            termsPrivacyPolicy,
            termsReceiptNews
        } = req.body;

        const usersRegister = new UsersRegisterService()
        const responseUsersRegister = await usersRegister.execute({
            name,
            companyName,
            email,
            cpfCnpj,
            typePerson,
            password,
            birthDate,
            gender,
            phone,
            termsUsePlatform,
            termsUseLGPD,
            termsPrivacyPolicy,
            termsReceiptNews
        });

         res.status(responseUsersRegister.data.status).json(responseUsersRegister.data)      
    }

}

export {UsersRegisterController};
