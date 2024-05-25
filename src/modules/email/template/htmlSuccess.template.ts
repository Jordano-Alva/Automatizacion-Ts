import { fechaHoy } from "../../../utils/utils";

export const htmlSuccess = (archivos: string[], carpeta: string, fecha: string = fechaHoy) => {
    const archivosList = archivos.map((archivo) => `<li>${archivo}</li>`).join("");

    return `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            h2 {
                color: #333;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: center;
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
            <h2>NOTIFICACION DE PROCESO AUTOMATIZADO</h2>
            <p>El proceso ejecutado se realizo con exito</p>
            <p>Proceso finalizado el: ${fecha} </p>
            <p>un total de ${archivos.length} archivos se subieron al servicio de AWS-S3, los cuales se almacenaron en la carpeta: ${carpeta} se detallan a continuacion:</p>
            <ul>
                ${archivosList} 
            </ul>
            <div class="footer">
                <p>Best Regards,<br> Your Company</p>
            </div>
        </div>
    </body>`;
};