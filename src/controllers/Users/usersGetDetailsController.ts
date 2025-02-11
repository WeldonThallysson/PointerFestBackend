import { Request, Response } from "express";
import { UsersGetDetailsService } from "../../services/Users/usersGetDetailsService";

class UsersGetDetailsController {
  async handle(req: Request, res: Response) {
    const idUserLogged = req.user_id;
    const { id } = req.params;

    const usersGetDetails = new UsersGetDetailsService();

    const responseUsersGetDetails = await usersGetDetails.execute({
      id: id,
      idUserLogged: idUserLogged,
    });

    return res.status(responseUsersGetDetails?.data?.status).json(responseUsersGetDetails.data);
  }
}

export { UsersGetDetailsController };
