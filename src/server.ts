import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";

import { router } from "./routes";
import cors from 'cors'
import path from 'path'
import fileUpload from "express-fileupload";
import {v2 as cloudinary} from 'cloudinary'

const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

app.use(cors())
app.use(express.json())

app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    },
    safeFileNames: true,
}))

 
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

app.use("/files",
  express.static(path.resolve(__dirname,"..","tmp"))
)
app.listen({ 
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
   }, () => {
   console.log( `---------------------------\nServidor Online \nHost: http://localhost:${process.env.PORT ? Number(process.env.PORT) : 3333}\n---------------------------`,  )
})


