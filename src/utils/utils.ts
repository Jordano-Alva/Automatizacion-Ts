import { Bucket } from "@aws-sdk/client-s3";
import { htmlError } from "../modules/email/template/htmlError.template";
import { htmlSuccess } from "../modules/email/template/htmlSuccess.template";

/**
 * Formatea una fecha determinada como una cadena localizada con estilo de fecha larga y estilo de hora corta.
 *
 * @param fecha - La fecha a formatear. Si no se proporciona, se utilizará la fecha actual.
 * @returns Una representación de cadena localizada de la fecha dada.
 */
export const fechaLocal = (fecha: Date = new Date()) => {
    return new Intl.DateTimeFormat("es-Es", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(fecha);
};


/**
 * Filtra una variedad de nombres de archivos según la extensión de archivo proporcionada.
 *
 * Archivos @param: una serie de nombres de archivos para filtrar.
 * Extensión @param: la extensión de archivo por la que filtrar. Si se establece en "todos", la función devolverá la matriz de archivos original.
 * @returns Una matriz de nombres de archivos que coinciden con la extensión de archivo proporcionada.
 */
export function filtrarArchivos(files: string[], extension: string = '.Bak') {
    if (extension === 'all') {
        return files;
    }
    return files.filter(file => file.endsWith(extension));
}

/**
 * Genera una cadena de barra de progreso basada en el porcentaje y el ancho de la barra dados.
 *
 * @param porcentaje: el valor porcentual a representar en la barra de progreso, entre 0 y 100.
 * @param anchoBarra - El ancho deseado de la barra de progreso, en número de caracteres. El valor predeterminado es 20.
 * @returns Una cadena que representa la barra de progreso, con caracteres rellenos y espacios vacíos.
 */
export function progresoBarra(porcentaje: number, anchoBarra: number = 20) {
    const numCaracteres = Math.max(1, Math.round((porcentaje / 100) * anchoBarra));
    return "=".repeat(numCaracteres) + " ".repeat(anchoBarra - numCaracteres)
}

/**
 * Convierte bytes a megabytes.
 *
 * @param bytes: el número de bytes a convertir.
 * @returns El número de megabytes.
 */
function bytesToMb(bytes: number) {
    return bytes / (1024 * 1024);
}


/**
 * Convierte un número determinado de bytes en una representación de cadena legible por humanos.
 *
 * @param bytes: el número de bytes a convertir.
 * @returns Una representación de cadena de los bytes en la unidad apropiada (Bytes, Kb, Mb o Gb).
 */
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

/**
 * Genera un objeto con propiedades de éxito y error que contiene contenido HTML para enviar archivos.
 *
 * @param archivos - Una serie de nombres de archivos para incluir en el mensaje de éxito.
 * @param carpeta: el nombre de la carpeta que se incluirá en los mensajes de éxito y error.
 * @param mensajeError: un mensaje de error opcional para incluir en el mensaje de error.
 * @returns Un objeto con propiedades `success` y `error` que contienen el contenido HTML generado.
 */
export function htmlAEnviar(archivos: string[], carpeta: string, mensajeError: string = '') {
    return {
        success: htmlSuccess(archivos, carpeta),
        error: htmlError(mensajeError, carpeta)
    }
}

/**
 * Valida la matriz de depósitos proporcionada.
 *
 * @param buckets: una serie de objetos Bucket para validar.
 * @returns `true` si la matriz de depósitos no está vacía, `false` en caso contrario.
 */
export function validacionBucket(buckets: Bucket[]) {
    try {
        return buckets.length > 0
    } catch (error) {
        console.log(`Error en validacion de Buckets: ${error}`);
        return false
    }
}