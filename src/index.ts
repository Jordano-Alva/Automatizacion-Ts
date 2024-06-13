import { enviarCorreo } from "./nodemailer";
import { preparacionZip } from "./services/AWS/aws.S3SyncClient";
import { compresionZip } from "./services/adm-zip";
import {Sentry} from "./services/sentry";
import dotenv from 'dotenv';
dotenv.config()

console.log(process.env.USERPROFILE)

console.log(process.env.HOME)



//corregir la fecha que toma en la modificacion, ya que le aumenta 1 dia cuando es 26
// Generar un error intencionalmente, considera que debes mandar en los cathc el throw
// try {

//     // compresionZip()
//     preparacionZip()
//     // enviarCorreo({destinatario: 'jordanoalvaradoc@gmail.com'}, 2)
// } catch (error) {
//     Sentry.captureException(error);
// }

