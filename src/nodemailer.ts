import 'dotenv/config'
import * as nodemailer from 'nodemailer'
import { fechaHoy, htmlAEnviar } from './utils/utils';
import { htmlSuccess } from './modules/email/template/htmlSuccess.template';


interface ProcessEnv {
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
}

interface OpcionesCorreo {
    archivo?: string[];
    carpeta?: string;
    remitente?: string;
    destinatario: string;
    asunto?: string;
    mensaje?: string;
}

const { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } = process.env as unknown as ProcessEnv

if (!EMAIL_HOST || !EMAIL_PASSWORD || !EMAIL_PORT || !EMAIL_USER) {
    throw new Error("Faltan variables de entorno")
}

const transporte = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

/**
  * Envía un correo electrónico utilizando el transporte de correo electrónico configurado.
  *
  * @param OpcionesCorreo las opciones para el correo electrónico, incluido el remitente, el destinatario, el asunto y el contenido del mensaje.
  * @returns Una promesa que se resuelve cuando el correo electrónico se ha enviado correctamente o se rechaza con un error si hubo un problema al enviar el correo electrónico.
  */
export const enviarCorreo = async (opciones: OpcionesCorreo, NumberOption: number = 1) => {

    const {
        archivo = [],
        carpeta = "",
        remitente = EMAIL_USER,
        destinatario = '',
        asunto = '',
        mensaje = (NumberOption === 1) ? htmlAEnviar(archivo, carpeta).success : htmlAEnviar(archivo, carpeta).error,
    } = opciones;

    try {

        await transporte.verify();

        const mailOptions: nodemailer.SendMailOptions = {
            from: remitente,
            to: destinatario,
            subject: asunto,
            html: mensaje,
        }

        const res = await transporte.sendMail(mailOptions);

        // console.info(res);
        // {
        //     accepted: [ 'jordanoalvaradoc@gmail.com' ],
        //     rejected: [],
        //     ehlo: [
        //       'SIZE 35882577',
        //       '8BITMIME',
        //       'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
        //       'ENHANCEDSTATUSCODES',
        //       'PIPELINING',
        //       'CHUNKING',
        //       'SMTPUTF8'
        //     ],
        //     envelopeTime: 4181,
        //     messageTime: 1645,
        //     messageSize: 1959,
        //     response: '250 2.0.0 OK  1717647831 a1e0cc1a2514c-80b5eb74c53sm83872241.34 - gsmtp',
        //     envelope: {
        //       from: 'llamadasprue@gmail.com',
        //       to: [ 'jordanoalvaradoc@gmail.com' ]
        //     },
        //     messageId: '<30e44259-da8f-1dc1-98d4-4b2016108e6c@gmail.com>'
        //   }
        return console.log(
            `Se envió exitosamente el correo a: ${opciones.destinatario} el ${fechaHoy} `
        );
    } catch (error) {
        console.error(`Error al enviar correo ${error}`);
        throw error;
    }
};

const dataCorreo: OpcionesCorreo = {
    archivo: ["prueba.txt"],
    carpeta: 'Prueba',
    remitente: EMAIL_HOST,
    destinatario: 'jordanoalvaradoc@gmail.com',
    asunto: 'Prueba',
    // mensaje: 'Hola'
}

// enviarCorreo(dataCorreo)