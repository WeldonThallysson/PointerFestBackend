import { Request, Response } from "express";
import { UsersDetailsService } from "../../services/Users/usersDetailsService";

class UsersDetailsController {
  async handle(req: Request, res: Response) {
    const idUserLogged = req.user_id;
    const { id } = req.params;

    const usersDetails = new UsersDetailsService();

    const responseUsersDetails = await usersDetails.execute({
      id: id,
      idUserLogged: idUserLogged,
    });

    return res.json(responseUsersDetails);
  }
}

export { UsersDetailsController };
