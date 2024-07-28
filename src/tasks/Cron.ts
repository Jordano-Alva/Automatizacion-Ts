import { CronJob } from "cron";
import { fechaLocal } from "../utils/utils";
import { procesamientoYenvioArchivos } from "../services/AWS/aws.S3SyncClient";
import { enviarCorreo } from "../config/nodemailer";

/**
 * Inicia un trabajo cron en la consola cada  segundo y detiene el trabajo después de la primera ejecución.
 * El trabajo cron también registra "cronJob Terminado" cuando se completa el trabajo y registra cualquier error que ocurra.
 */

let IsRunning = false;

export const cronStart = async () => {


    //TODO: nueva forma !!PROBAR

    const job = new CronJob(
        '* * * * * *',
        //https://crontab.guru/
        // '* 25 11 * * *', // Esto se ejecutará a la medianoche todos los días
        async () => {
            if (IsRunning) return;
            IsRunning = true;
            const horaInicio = new Date()
            const horaInicioLocal = fechaLocal(horaInicio)
            console.info(`Iniciando el proceso automatizado el ${horaInicioLocal}`);
            // Ejecución del proceso a correr
            try {
                await procesamientoYenvioArchivos();
                // await enviarCorreo({ destinatario: 'jordanoalvaradoc@gmail.com' }, 2)
                const horaFin = new Date()
                const horaFinLocal = fechaLocal(horaFin)
                console.log(`cronJob Terminado ${horaFinLocal}`);
            } catch (error) {
                console.error(`Error en cronStart ${error}`);
            } finally {
                job.stop();
                IsRunning = false  // Detén el trabajo después de la ejecución
            }
        },
        null,
        true // Esto inicia el trabajo inmediatamente
    );
};
