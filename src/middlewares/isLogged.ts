import {Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'


interface IVerificationToken {
    sub: string;
}


export const isLogged = (req: Request, res: Response, next: NextFunction) => {
    const loggedToken = req.headers.authorization;

    if(!loggedToken){
        return res.status(401).json({
            status: 401,
            message: "Solicitação necessita do token de autenticação, faça o login."
        }).end()
    }

    const [, token] = loggedToken.split(" ");

    try {
        const {sub} = verify(token, process.env.JWT_SECRET) as IVerificationToken
        req.user_id = sub;
        console.log("Verificação de token concluída")
    }
    
    
    catch(err){
        res.status(401).json({
            status: 401,
            message: "Solicitação falhou, ocorreu algum erro na verificação do token."
        }).end();

    }

    return next()
}