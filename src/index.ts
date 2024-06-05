import { preparacionZip } from "./services/AWS/aws.S3SyncClient";
import { compresionZip } from "./services/adm-zip";
import {Sentry} from "./services/sentry";


//corregir la fecha que toma en la modificacion, ya que le aumenta 1 dia cuando es 26
// Generar un error intencionalmente
try {
    // compresionZip()
    // preparacionZip()
} catch (error) {
    Sentry.captureException(error);
}