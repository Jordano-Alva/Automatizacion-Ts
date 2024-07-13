import { enviarCorreo } from "./nodemailer";
import { procesamientoYenvioArchivos } from "./services/AWS/aws.S3SyncClient";
import { compresionZip, urlPath, urlPathZip, zipCreado } from "./services/adm-zip";
import {Sentry} from "./services/sentry";
import dotenv from 'dotenv';
import { cronStart } from "./tasks/Cron";
dotenv.config()


//corregir la fecha que toma en la modificacion, ya que le aumenta 1 dia cuando es 26
// Generar un error intencionalmente, considera que debes mandar en los cathc el throw
try {

    // compresionZip()
    procesamientoYenvioArchivos()
    // cronStart()
    // enviarCorreo({destinatario: 'jordanoalvaradoc@gmail.com'}, 2)
} catch (error) {
    Sentry.captureException(error);
}

