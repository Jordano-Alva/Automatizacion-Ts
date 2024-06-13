import AdmZip from "adm-zip";
import { fechaHoy, filtrarArchivos } from "../utils/utils";
import { crearCarpeta, formatearFecha, leerContenidoDirectorio, obtenerFechaCreacion } from "./fileSystem";
import path from "path";
import dotenv from 'dotenv';
import { barraProgress } from "../utils/cli-Progress";
dotenv.config();


const urlPath = process.env.HOMEPATH + "\\Downloads";
const zipCreado = urlPath + "\\PruebaZipHora";

const urlPathZip = process.env.HOMEPATH + "\\Downloads\\Zip";

interface ResultadoCompresion {
    mensaje: string;
    validacion: boolean;
    carpetaCreada?: string,
    directorioCarpeta?: string,
}

export function compresionZip(nombreCarpetaOrigen: string = zipCreado, nombreArchivoZip: string = 'Test.zip') {

    try {
        console.time('Compresion')
        console.log(`Iniciando proceso de compresion el ${fechaHoy}`)

        const directorio = leerContenidoDirectorio(urlPathZip);
        const archivosAFiltrar = filtrarArchivos(directorio, 'all');
        const archivosPorFecha = new Map<string, string[]>();

        crearCarpeta(nombreCarpetaOrigen)


        //Agrupar archivos por fecha de creacion
        // console.log('Comprimiendo los archivos por fecha de creacion')
        archivosAFiltrar.forEach((archivo) => {
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

        // Inicializar la barra de progreso
        // const totalArchivos = archivosAFiltrar.length;
        // const bar = new SingleBar({}, Presets.shades_classic);

        //Crea carpetas y archivos ZIP por cada grupo de fecha
        archivosPorFecha.forEach((archivos, fecha) => {
            const instanciaZip = new AdmZip();
            // const nombreCarpetaFecha = path.join(nombreCarpetaOrigen, fecha);

            // crearCarpeta(nombreCarpetaFecha)

            archivos.forEach((archivo) => {
                instanciaZip.addLocalFile(archivo)
                barraProgress.increment();  // Incrementar la barra de progreso
            });

            // const rutaArchivoZip = path.join(nombreCarpetaFecha, `${fecha}.zip`);
            const rutaArchivoZip = path.join(nombreCarpetaOrigen, `${fecha}.zip`);
            instanciaZip.writeZip(rutaArchivoZip);

            resultado.push({
                mensaje: "Carpeta comprimida correctamente.",
                validacion: true,
                carpetaCreada: rutaArchivoZip,
                // directorioCarpeta: nombreCarpetaFecha,
                directorioCarpeta: nombreCarpetaOrigen,
            });
        });
        barraProgress.stop();
        //Crea el archivo zip
        console.log(`Terminado el proceso de Compresion el ${fechaHoy}`);
        console.log(resultado)
        console.timeEnd('Compresion')
        return resultado

    } catch (error) {
        console.error(`Error al comprimir la carpeta: ${error}`);
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
