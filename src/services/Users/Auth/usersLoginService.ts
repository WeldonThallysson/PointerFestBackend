import prismaClient from "../../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface loginUsuarioType {
  account: string;
  password: string;
}

class UsersLoginService {
  async execute({ account, password }: loginUsuarioType) {
    if (!account) {
      return {
        data: {
          message: "Por favor, informe seu e-mail, CPF ou CNPJ para continuar.",
          status: 400,
        },
      };
    }

    if (!password) {
      return {
        data: {
          message: "Por favor, informe sua senha para continuar.",
          status: 400,
        },
      };
    }

    const users = await prismaClient.users.findFirst({
      where: {
        email: account,
        cpfCnpj: account,
      },
    });

    if (!users) {
      return {
        data: {
          message:
            "Não foi possível prosseguir, este E-mail, CPF ou CNPJ não existe.",
          status: 404,
        },
      };
    }

    const verifyPassword = await compare(password, users.password);

    if (!verifyPassword) {
      return {
        data: {
          message: "Não foi possível prosseguir, sua senha está incorreta.",
          status: 401,
        },
      };
    }

    const token = sign(
      {
        name: users.name,
        password: users.password,
      },
      process.env.JWT_SECRET,
      {
        subject: users.id,
        expiresIn: "30d",
      }
    );

    return {
      id: users.id,
      email: users.email,
      token: token,
    };
  }
}

export { UsersLoginService };
