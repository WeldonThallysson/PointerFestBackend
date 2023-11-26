import express,{ Request,Response,NextFunction } from "express";
import { router } from "./routes";
import "express-async-errors"
import cors from 'cors'
const app = express()
app.use(cors())

app.use(express.json())

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
            err: err.message
        })
    }

    return res.status(500).json({
        status:"error",
        message: "internal error server"
    })
}) // esse middleware serve para enviar todos os erros de uma forma amigavel e bonita.


app.use(router)
app.listen(3333,( ) => {
   console.log("servidor online")
})


