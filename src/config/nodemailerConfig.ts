import nodemailer from 'nodemailer'

interface ITransporter {
    authEmail: string,
    authPassword: string
}

export const transporter = ({authEmail, authPassword}: ITransporter) => {
    
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST_NODEMAILER ?? 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: authEmail,
            pass: authPassword
        }
    })
}