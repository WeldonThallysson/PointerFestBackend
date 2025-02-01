import {Request,Response } from 'express'
import { UsersGetAllService } from '../../services/Users/usersGetAllSevice'
 

class UsersGetAllController {
    async handle(req: Request, res: Response){
      const id_user_logged = req.user_id;
      const idOtherUser = req.query.idOtherUser as string;
      const name = req.query.name as string;
      const email = req.query.email as string;
      const cpfCnpj = req.query.cpfCnpj as string;
      const phone = req.query.phone as string;
      const birthDate = req.query.birthDate as string;
      const gender = req.query.gender as string;
      const typePerson = req.query.typePerson as string;
      const city = req.query.city as string;
      const street = req.query.street as string;
      const neighborhood = req.query.neighborhood as string;
      const complement = req.query.complement as string; 
      const cep = req.query.cep as string;
      const number_address = req.query.number_address as string;
      const region_code = req.query.region_code as string;
      const typeAccess = req.query.typeAccess as string;
      const status = req.query.status as string;
      const page = req.query.page as string;
      const limit = req.query.limit as string
 
       const usersGetAll = new UsersGetAllService()

       const responseUsersGetAll = await usersGetAll.execute({
          id_user_logged: id_user_logged,
          idOtherUser: idOtherUser,
          name: name,
          email: email,
          cpfCnpj: cpfCnpj,
          phone: phone,
          birthDate: birthDate,
          gender: gender,
          typeAccess: typeAccess,
          typePerson: typePerson,
          city: city,
          street: street,
          neighborhood: neighborhood,
          complement: complement,
          cep: cep,
          number_address: number_address,
          region_code: region_code,
          ...(status !== null && {status: status !== 'false' ? true : false}),
          page: Number(page),
          limit: Number(limit)

       })
       return res.json(responseUsersGetAll)
    }

}

export {UsersGetAllController}