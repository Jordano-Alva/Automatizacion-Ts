"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlError = void 0;
var utils_1 = require("../../../utils/utils");
var htmlError = function (archivos, carpeta, fecha) {
    if (fecha === void 0) { fecha = utils_1.fechaHoy; }
    var archivosList = archivos.map(function (archivo) { return "<li>".concat(archivo, "</li>"); }).join("");
    return "\n    <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Email Template</title>\n        <style>\n            body {\n                font-family: Arial, sans-serif;\n                line-height: 1.6;\n                margin: 0;\n                padding: 0;\n            }\n            .container {\n                max-width: 600px;\n                margin: 0 auto;\n                padding: 20px;\n                border: 1px solid #ccc;\n                border-radius: 5px;\n                background-color: #f9f9f9;\n            }\n            h2 {\n                color: #333;\n                white-space: nowrap;\n                text-overflow: ellipsis;\n                overflow: hidden;\n                text-align: center;\n            }\n            p {\n                color: #666;\n            }\n            .footer {\n                margin-top: 20px;\n                text-align: center;\n                color: #999;\n            }\n        </style>\n    </head>\n    <body>\n        <div class=\"container\">\n            <h2>NOTIFICACION DE PROCESO AUTOMATIZADO - ERROR</h2>\n            <p>El proceso ejecutado presento un error</p>\n            <p>Proceso finalizado el: ".concat(fecha, " </p>\n            <div class=\"footer\">\n                <p>Best Regards,<br> Your Company</p>\n            </div>\n        </div>\n    </body>");
};
exports.htmlError = htmlError;
