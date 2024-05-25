import fs from 'fs'
import path from 'path';
import os from 'os';

// !Ver si funca
export function leerContenidoDirectorio(directorio: string) {
    const lectura = fs.readdirSync(directorio, {
        recursive: true,
        encoding: 'utf-8'
    });
    return lectura
}

export function crearCarpeta(nombreCarpeta: string) {
    //Valida que la carpeta este creada, caso contrario, la crea
    if (!fs.existsSync(nombreCarpeta)) {
        fs.mkdirSync(nombreCarpeta);
        console.log(`Se creo con exito la carpeta: ${nombreCarpeta}`);
        return true;
    } else {
        console.log(`La carpeta ${nombreCarpeta} ya existe`)
        return false
    }
}


export function obtenerFechaCreacion(archivo: string): Date {
    const stats = fs.statSync(archivo);
    const sistemaO = os.platform()
    if (sistemaO === 'win32') {
        console.log(`ObtenerFechaCreacion ${stats.birthtime}`)
        return stats.birthtime;

    } else if (sistemaO === 'linux') {
        return stats.mtime;

    } else {

        return stats.birthtime;
    }
}

export function obtenerFechaMasReciente(fechas: Date[]): Date {
    console.log(`fechas: ${new Date(Math.max(...fechas.map(date => date.getTime())))}`)
    return new Date(Math.max(...fechas.map(date => date.getTime())))
}

export function formatearFecha(prefijo: string, fecha: Date): string {
    //Formate la fecha como YYYY-MM-DD
    const fechaFormateada = fecha.toISOString().slice(0, 10)
    return `${prefijo}_${fechaFormateada}`
}