import { Request,Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface verificacaoToken {
    sub: string
}

export function isLogged(req:Request, res:Response, next:NextFunction){
    

    const loggedToken = req.headers.authorization;

    if(!loggedToken){
        return res.status(401).end()
    }

    const [,token] = loggedToken.split(" ")

    try{
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as verificacaoToken;
       
        req.usuario_id = sub
        console.log("-middleware de verificação de token concluido")
    }
    catch(err){
       res.status(401).end()

    }

    return next()
}