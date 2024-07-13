import { fechaHoy } from "../../../utils/utils";

/**
 * Generates an HTML email template for a successful automated process.
 *
 * @param archivos - An array of file names that were uploaded to the AWS-S3 bucket.
 * @param carpeta - The name of the AWS-S3 bucket where the files were stored.
 * @param fecha - The date the process was completed, defaults to the current date.
 * @returns An HTML string representing the email template.
 */
export const htmlSuccess = (archivos: string[], carpeta: string, fecha: string = fechaHoy) => {
    const archivosList = archivos.map((archivo) => `<li>${archivo}</li>`).join("");

    return `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 900px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                background-color: #f9f9f9;
            }
            h2 {
                color: #333;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: center;
                color: green
            }
            p {
                color: #666;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>NOTIFICACION DE PROCESO AUTOMATIZADO -  EXITOSO</h2>
            <p>El proceso ejecutado se realizo con exito</p>
            <p>Proceso finalizado el: ${fecha} </p>
            <p>Un total de ${archivos.length} archivos se subieron al servicio de AWS-S3, los cuales se almacenaron en en el Bucket: ${carpeta} se detallan a continuacion:</p>
            <ul>
                ${archivosList} 
            </ul>
             <div class="footer">
                <img src="cid:logo-fundasen.png"; width="500" height="150"/>
            </div>
        </div>
    </body>`;
};