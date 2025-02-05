import { Request, Response } from "express";
import { UsersLoginService } from "../../../services/Users/Auth/usersLoginService";

class UsersLoginController {
  async handle(req: Request, res: Response) {
    const { account, password } = req.body;

    const usersLogin = new UsersLoginService();
    const responseUsersLogin = await usersLogin.execute({
      account,
      password,
    });

    return res.status(responseUsersLogin?.data?.status).json(responseUsersLogin?.data);
  }
}

export { UsersLoginController };
