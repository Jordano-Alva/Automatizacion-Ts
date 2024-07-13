import { fechaHoy } from "../../../utils/utils";

/**
 * Generates an HTML email template for an error notification.
 *
 * @param {string} mensajeError - The error message to be displayed in the email.
 * @param {string} [fecha=fechaHoy] - The date of the error, defaulting to the current date.
 * @returns {string} The HTML email template with the error message and other details.
 */
export const htmlError = (mensajeError: string, fecha: string = fechaHoy) => {
    // const archivosList = archivos.map((archivo) => `<li>${archivo}</li>`).join("");
    let ruta;
    //Personalizacion de mensaje de error
    if (mensajeError.includes('scandir')) {
        const mensaje = mensajeError.split(' ');
        let rutaArc = mensaje[mensaje.length - 1];
        ruta = `<li>No existe la carpeta : <u>${rutaArc}</u> en el directorio actual</li>`;
        mensajeError = ruta
    } else {
        mensajeError = `<li>${mensajeError}</li>`;
    }
    //!Ver que funque lo del logo
    // const rutaImag = '../../../public/logo-fundasen.png'

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
                color: red
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
            <h2>NOTIFICACION DE PROCESO AUTOMATIZADO - ERROR</h2>
            <p>Proceso finalizado el: ${fechaHoy}</p>
            <p>El proceso ejecutado presentó el siguiente error: </p>
            <ul>${mensajeError}</ul>
            <div class="footer">
                <img src="cid:logo-fundasen.png"; width="500" height="150"/>
            </div>
        </div>
    </body>`;
};