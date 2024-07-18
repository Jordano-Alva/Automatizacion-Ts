import AdmZip from "adm-zip";
import { fechaHoy, filtrarArchivos } from "../utils/utils";
import { crearCarpeta, formatearFecha, leerContenidoDirectorio, obtenerFechaCreacion } from "./fileSystem";
import path from "path";
import dotenv from 'dotenv';
import { barraProgress } from "../utils/cli-Progress";
dotenv.config();


export const urlPath = process.env.HOME + "\\" + process.env.RUTA_CARPETA;
export const zipCreado = urlPath + "\\" + process.env.NOMBRE_CARPETA_A_CREAR;
export const urlPathZip = urlPath + "\\" + process.env.NOMBRE_CARPETA;

interface ResultadoCompresion {
    mensaje: string;
    validacion: boolean;
    carpetaCreada?: string,
    directorioCarpeta?: string,
}

export async function compresionZip(nombreCarpetaACrear: string = zipCreado, nombreArchivoZip: string = 'Test.zip') {

    try {
        console.time('Compresion')
        console.log(`Iniciando proceso de compresion el ${fechaHoy}`)

        const directorio = leerContenidoDirectorio(urlPathZip);
        const archivosAFiltrar = filtrarArchivos(directorio, 'all');
        const archivosPorFecha = new Map<string, string[]>();

        crearCarpeta(nombreCarpetaACrear)


        //Agrupar archivos por fecha de creacion
        archivosAFiltrar.forEach(async (archivo) => {
            const rutaArchivo = path.join(urlPathZip, archivo)
            const fechaCreacion = obtenerFechaCreacion(rutaArchivo);
            const fechaFormateada = formatearFecha('Backup', fechaCreacion);

            if (!archivosPorFecha.has(fechaFormateada)) {
                archivosPorFecha.set(fechaFormateada, [])
            }
            archivosPorFecha.get(fechaFormateada)!.push(rutaArchivo)

        })

        const totalArchivos = archivosAFiltrar.length;
        barraProgress.start(totalArchivos, 0);
        const resultado: ResultadoCompresion[] = [];

        //Crea carpetas y archivos ZIP por cada grupo de fecha
        archivosPorFecha.forEach((archivos, fecha) => {

            const instanciaZip = new AdmZip();

            archivos.forEach((archivo) => {
                instanciaZip.addLocalFile(archivo)
                barraProgress.increment();  // Incrementar la barra de progreso
            });

            const rutaArchivoZip = path.join(nombreCarpetaACrear, `${fecha}.zip`);
            instanciaZip.writeZip(rutaArchivoZip);

            resultado.push({
                mensaje: "Carpeta comprimida correctamente.",
                validacion: true,
                carpetaCreada: rutaArchivoZip,
                directorioCarpeta: nombreCarpetaACrear,
            });
        });
        barraProgress.stop();
        console.log(`Terminado el proceso de Compresion el ${fechaHoy}`);
        console.timeEnd('Compresion')
        return resultado

    } catch (error) {
        // console.error(`Error al comprimir la carpeta: ${error}`);
        return [{
            mensaje: `Error al comprimir la carpeta: ${error}`,
            validacion: false,
        }];
    }
}


function extraerArchivosDelZip(instanciaZip = new AdmZip()) {
    //Recorre los arhivos y solo confirma que existen
    instanciaZip.forEach((zipD) => {
        console.log(zipD.toString());
    });
    //Extraer todo del ZIP y guardar en una carpeta especifica
    instanciaZip.extractAllTo(urlPathZip);
}
