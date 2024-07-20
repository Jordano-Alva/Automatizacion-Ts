import { fechaLocal } from "../../../utils/utils";


/**
 * Genera una plantilla de correo electrónico HTML para un proceso automatizado exitoso.
 *
 * @param archivos: una serie de nombres de archivos que se cargaron en el servicio AWS-S3.
 * @param carpeta: el nombre del depósito donde se almacenaron los archivos.
 * @param fecha - La fecha y hora en que se completó el proceso. El valor predeterminado es la hora local actual si no se proporciona.
 * @returns La plantilla de correo electrónico HTML como una cadena.
 */
export const htmlSuccess = (archivos: string[], carpeta: string, fecha: string = fechaLocal()) => {
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