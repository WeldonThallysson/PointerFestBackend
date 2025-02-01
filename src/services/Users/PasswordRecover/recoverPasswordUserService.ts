import prismaClient from "../../../prisma";
import jsonwebtoken from "jsonwebtoken";
import { transporter } from "../../../config/nodemailerConfig"; 
import fs from "fs";
import path from "path";
import { validatorEmail } from "../../../utils/validators/validatorEmail";

interface IRecoverPasswordService {
  email: string;
}

class RecoverPasswordService {
  async execute({ email }: IRecoverPasswordService) {

    if (!email) {
      return {
        data: {
          message: "Por favor informe seu email para prosseguir.",
          status: 400,
        },
      };
    }

    
    if(!validatorEmail(email)){
      return {
        data: {
          message: "Não foi possível prosseguir com a ação, E-mail inválido.",
          status: 400,
        },
      };
    }

    try {
      const userExists = await prismaClient.users.findFirst({
        where: {
          email: email,
        },
      });

      if (!userExists) {
        return {
          data: {
            message: "Não foi possível prosseguir com a ação, E-mail do usuário não encontrado!",
            status: 404,
          },
        };
      }

      const tokenRecoverPassword = jsonwebtoken.sign(
        { userId: userExists.id },
        process.env.JWT_SECRET,
        { expiresIn: "30min" }
      );

      const resetLink = `${process.env.FRONTEND_URL}${process.env.LINK_REDEFINE_PASSWORD_URL}/${tokenRecoverPassword}`;
      const filePath = path.join( __dirname,"../../../constants/templates/templateRecoverPassword.html");
      let htmlContent = fs.readFileSync(filePath, "utf-8");

      htmlContent = htmlContent
        .replace("{{resetLink}}", resetLink)
        .replace("{{userName}}", userExists.name.split(" ")[0]);

        const mailOptions = {
          from: `Suporte Up Point <${process.env.EMAIL_USER_RECOVERPASSWORD}>`,
          to: userExists.email,
          subject: "Redefinição de Senha",
          html: htmlContent,
          messageId: `<${Date.now()}-${Math.random().toString(36).slice(2)}>`,
          headers: { 'X-Entity-Ref-ID': `${Date.now()}` },
        };

      await transporter({
        authEmail: process.env.EMAIL_USER_RECOVERPASSWORD,
        authPassword: process.env.EMAIL_PASSWORD_RECOVERPASSWORD
      }).sendMail(mailOptions);

      return {
        data: {
          message: "E-mail de recuperação enviado, confira sua caixa de entrada.",
          status: 200,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        data: {
          err: err,
          message: "Erro ao enviar e-mail para recuperação de senha.",
          status: 500,
        },
      };
    }
  }
}

export { RecoverPasswordService };
