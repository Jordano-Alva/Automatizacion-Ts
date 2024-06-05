import fs from 'fs'
import os from 'os';
import { barraProgress } from '../utils/cli-Progress';

export function leerContenidoDirectorio(directorio: string) {
    const lectura = fs.readdirSync(directorio, {
        recursive: true,
        encoding: 'utf-8'
    });
    // barraProgress.increment();
    return lectura
}

export function crearCarpeta(nombreCarpeta: string) {
    //Valida que la carpeta este creada, caso contrario, la crea
    if (!fs.existsSync(nombreCarpeta)) {
        fs.mkdirSync(nombreCarpeta);
        // console.log(`Se creo con exito la carpeta: ${nombreCarpeta}`);
        // barraProgress.increment();
        return true;
    } else {
        // console.log(`La carpeta ${nombreCarpeta} ya existe`)
        // barraProgress.increment();
        return false
    }
}


export function obtenerFechaCreacion(archivo: string): Date {
    const stats = fs.statSync(archivo);
    const sistemaO = os.platform()
    if (sistemaO === 'win32') {
        // console.log(`ObtenerFechaCreacion ${stats.mtime}`)
        // barraProgress.increment();
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

export function formatearFecha(prefijo: string, fecha: Date): string {

    const fechaFormateada = Intl.DateTimeFormat("es-Es", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(fecha).replace(/\//g, "-");
    // barraProgress.increment();
    return `${prefijo}_${fechaFormateada}`
}