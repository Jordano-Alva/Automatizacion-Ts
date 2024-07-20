import fs from 'fs'
import os from 'os';
import { barraProgress } from '../utils/cli-Progress';

/**
 * Lee el contenido de un directorio.
 *
 * @param directorio: la ruta al directorio a leer.
 * @returns Una matriz de nombres de archivos y directorios en el directorio especificado.
 */
export function leerContenidoDirectorio(directorio: string) {
    const lectura = fs.readdirSync(directorio, {
        recursive: true,
        encoding: 'utf-8'
    });
    return lectura
}

/**
 * Crea una carpeta con el nombre especificado si aún no existe.
 *
 * @param nombreCarpeta - El nombre de la carpeta a crear.
 * @returns `true` si la carpeta fue creada, `false` si la carpeta ya existe.
 */
export function crearCarpeta(nombreCarpeta: string) {
    //Valida que la carpeta este creada, caso contrario, la crea
    if (!fs.existsSync(nombreCarpeta)) {
        fs.mkdirSync(nombreCarpeta);
        return true;
    } else {

        return false
    }
}


/**
 * Obtiene la fecha de creación del archivo especificado.
 *
 * @param archivo - La ruta al archivo.
 * @returns La fecha de creación del archivo.
 */
export function obtenerFechaCreacion(archivo: string): Date {
    const stats = fs.statSync(archivo);
    const sistemaO = os.platform()
    if (sistemaO === 'win32') {
        return stats.mtime;

    } else if (sistemaO === 'linux') {
        return stats.mtime;

    } else {

        return stats.mtime;
    }
}

function obtenerFechaMasReciente(fechas: Date[]): Date {
    console.log(`fechas: ${new Date(Math.max(...fechas.map(date => date.getTime())))}`)
    return new Date(Math.max(...fechas.map(date => date.getTime())))
}

/**
 * Formatea una fecha con un prefijo determinado.
 *
 * @param prefijo - El prefijo que se agregará a la fecha formateada.
 * @param fecha - La fecha a formatear.
 * @returns La cadena de fecha formateada con el prefijo dado.
 */
export function formatearFecha(prefijo: string, fecha: Date): string {

    const fechaFormateada = Intl.DateTimeFormat("es-Es", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(fecha).replace(/\//g, "-");
    return `${prefijo}_${fechaFormateada}`
}