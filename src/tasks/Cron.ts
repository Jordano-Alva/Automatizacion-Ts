import { CronJob } from "cron";
import { fechaHoy } from "../utils/utils";
import { preparacionZip } from "../services/AWS/aws.S3SyncClient";

/**
 * Inicia un trabajo cron en la consola cada 5 segundos y detiene el trabajo después de la primera ejecución.
 * El trabajo cron también registra "cronJob Terminado" cuando se completa el trabajo y registra cualquier error que ocurra.
 */
export const cronStart = async () => {


    const job = new CronJob(
        '* * * * * *',
        async () => {
            job.start();
            console.info(`Iniciando el proceso automatizado el ${fechaHoy}`);
            //ejecucion del proceso a correr
            try {
                await preparacionZip();
                job.stop();
                console.log('cronJob Terminado');
            } catch (error) {
                console.error(`Error en cronStart ${error}`);
                job.stop()
            }
            //Termina el proceso
        },
        null,
    )

    // const job = CronJob.from({
    //     //Tiempo debe ser configurado
    //     cronTime: "* * * * * *",
    //     // cronTime: "0 */5 * * * *",

    //     //cb que realiza
    //     onTick: async () => {
    //         console.info(`Iniciando el proceso automatizado el ${fechaHoy}`);
    //         //ejecucion del proceso a correr
    //         try {
    //             await preparacionZip();
    //             job.stop();
    //         } catch (error) {
    //             console.error(`Error en cronStart ${error}`);
    //         }
    //         //Termina el proceso
    //     },

    //     //cb que realiza cuando se completa la tarea por el job.stop
    //     onComplete: async () => {
    //         // await sendEmail()
    //         console.log("cronJob Terminado");
    //     },
    //     start: true,

    // });

    //* Cron Node importado desde (import cron from "node-cron")
    // cron.schedule("*/10 * * * * *", async () => {
    //     console.log("Probando");
    //     // await sendEmail();
    // }, {
    //     once: true
    // });
};
