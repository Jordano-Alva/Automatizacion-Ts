"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlAEnviar = exports.bytesToMb = exports.progresoBarra = exports.filtrarArchivos = exports.fechaHoy = void 0;
var htmlError_template_1 = require("../modules/email/template/htmlError.template");
var htmlSuccess_template_1 = require("../modules/email/template/htmlSuccess.template");
exports.fechaHoy = new Intl.DateTimeFormat("es-Es", {
    dateStyle: "long",
    timeStyle: "short",
}).format(new Date());
function filtrarArchivos(files, extension) {
    if (extension === void 0) { extension = '.Bak'; }
    return files.filter(function (file) { return file.endsWith(extension); });
}
exports.filtrarArchivos = filtrarArchivos;
function progresoBarra(porcentaje, anchoBarra) {
    if (anchoBarra === void 0) { anchoBarra = 20; }
    var numCaracteres = Math.max(1, Math.round((porcentaje / 100) * anchoBarra));
    return "=".repeat(numCaracteres) + "".repeat(anchoBarra - numCaracteres);
}
exports.progresoBarra = progresoBarra;
function bytesToMb(bytes) {
    return bytes / (1024 * 1024);
}
exports.bytesToMb = bytesToMb;
function htmlAEnviar(archivos, carpeta) {
    return {
        success: (0, htmlSuccess_template_1.htmlSuccess)(archivos, carpeta),
        error: (0, htmlError_template_1.htmlError)(archivos, carpeta)
    };
}
exports.htmlAEnviar = htmlAEnviar;
