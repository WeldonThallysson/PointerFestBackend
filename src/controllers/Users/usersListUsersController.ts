import { Request, Response } from 'express';
import { deformatter } from '../../utils/desformatter';
import { UsersGetAllListService } from '../../services/Users/usersGetAllListService';
 
class UsersGetAllListController {
  async handle(req: Request,res: Response){
    const id_user_logged = req.user_id
    const idOtherUser = req.query.idOtherUser as string
    const name = req.query.name as string
    const email = req.query.email as string
    const cpfCnpj = req.query.cpfCnpj as string
    const cep = req.query.cep as string
    const phone = req.query.phone as string
    const birthDate = req.query.birthDate as string
    const residence = req.query.residence as string
    const neighborhood = req.query.neighborhood as string
    const address = req.query.address as string
    const city = req.query.city as string;
    const gender = req.query.gender as string;
    const typeAccess = req.query.typeAccess as string; 
    const status = req.query.status as string
    
    const getListUsers = new UsersGetAllListService()
    const responseGetListUsers = await getListUsers.execute({
      id_user_logged,
      idOtherUser,
      name,
      email,
      cpfCnpj: cpfCnpj ? deformatter(cpfCnpj) : null,
      phone: phone ? deformatter(phone) : null,
      birthDate,
      residence,
      neighborhood,
      address,
      city,
      gender,
      typeAccess,
      cep: cep ? deformatter(cep) : null,
      ...(status !== null && {status: status !== 'false' ? true : false})
    })

    return res.status(responseGetListUsers.data.status).json(responseGetListUsers.data)

  }
}

export { UsersGetAllListController };
