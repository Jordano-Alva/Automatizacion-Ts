import { enviarCorreo } from "./config/nodemailer";
import { procesamientoYenvioArchivos } from "./services/AWS/aws.S3SyncClient";
import { compresionZip, urlPath, urlPathZip, zipCreado } from "./services/adm-zip";
import {Sentry} from "./services/sentry";
import dotenv from 'dotenv';
import { cronStart } from "./tasks/Cron";
dotenv.config()



try {

    // compresionZip()
    // procesamientoYenvioArchivos()
    cronStart()
    // enviarCorreo({destinatario: 'jordanoalvaradoc@gmail.com'}, 2)
} catch (error) {
    Sentry.captureException(error);
}

