import { Bucket } from "@aws-sdk/client-s3";
import { htmlError } from "../modules/email/template/htmlError.template";
import { htmlSuccess } from "../modules/email/template/htmlSuccess.template";

export const fechaHoy = new Intl.DateTimeFormat("es-Es", {
    dateStyle: "long",
    timeStyle: "short",
}).format(new Date());


export function filtrarArchivos(files: string[], extension: string = '.Bak') {
    if (extension === 'all') {
        return files;
    }
    return files.filter(file => file.endsWith(extension));
}

export function progresoBarra(porcentaje: number, anchoBarra: number = 20) {
    const numCaracteres = Math.max(1, Math.round((porcentaje / 100) * anchoBarra));
    return "=".repeat(numCaracteres) + " ".repeat(anchoBarra - numCaracteres)
}

function bytesToMb(bytes: number) {
    return bytes / (1024 * 1024);
}


export function formatSize(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes} Bytes`;

    } else if (bytes < (1024 * 1024)) {
        return `${(bytes / 1024).toFixed(2)} Kb`

    } else if (bytes < (1024 * 1024 * 1024)) {
        return `${bytesToMb(bytes).toFixed(2)} Mb`

    } else {
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} Gb`
    }
}

export function htmlAEnviar(archivos: string[], carpeta: string) {
    return {
        success: htmlSuccess(archivos, carpeta),
        error: htmlError(archivos, carpeta)
    }
}

export function validacionBucket(buckets: Bucket[]) {
    try {
        return buckets.length > 0
    } catch (error) {
        console.log(`Error en validacion de Buckets: ${error}`);
        return false
    }
}