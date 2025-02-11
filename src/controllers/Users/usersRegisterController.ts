import { Request, Response } from "express";
import { UsersRegisterOtherService } from "../../services/Users/usersRegisterOtherService";
import { UploadedFile } from "express-fileupload";



class UsersRegisterOtherController {
  async handle(req: Request, res: Response) {
    const id_user_logged = req.user_id
    const {
      name,
      email,
      password,
      cpfCnpj,
      phone,
      birthDate,
      gender,
      street,
      neighborhood,
      complement, 
      city, 
      cep,       
      region_code,  
      number_address, 
      typeAccess,
      typePerson,
      status,
      termsUsePlatform,
      termsUseLGPD,
      termsPrivacyPolicy,
      termsReceiptNews
    } = req.body;

    
    const profileAvatar = req.files.profileAvatar as UploadedFile
    //const profile 
    const usersRegisterOtherService = new UsersRegisterOtherService();
    const responseRegisterUser = await usersRegisterOtherService.execute({
      id_user_logged,
      name,
      email,
      password,
      cpfCnpj,
      phone,
      birthDate,
      gender,
      street,
      neighborhood,
      complement, 
      city, 
      cep,       
      region_code,  
      number_address, 
      typeAccess,
      typePerson,
      status,
      termsUsePlatform,
      termsUseLGPD,
      termsPrivacyPolicy,
      termsReceiptNews,
      profileAvatar
      
    });

    return res
      .status(responseRegisterUser.data.status)
      .json(responseRegisterUser.data);
  }
}

export { UsersRegisterOtherController };
