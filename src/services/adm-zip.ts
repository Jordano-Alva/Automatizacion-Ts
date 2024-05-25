import AdmZip from "adm-zip";
import { fechaHoy, filtrarArchivos } from "../utils/utils";
import { crearCarpeta, formatearFecha, leerContenidoDirectorio, obtenerFechaCreacion, obtenerFechaMasReciente } from "./fileSystem";
import path from "path";

const urlPath = process.env.HOMEPATH + "\\Downloads";
const zipCreado = urlPath + "\\PruebaZip";

const urlPathZip = process.env.HOMEPATH + "\\Downloads\\Zip2";

export function compresionZip(nombreCarpetaOrigen: string = zipCreado, nombreArchivoZip: string = 'Test.zip') {

    try {
        console.log(`Iniciando proceso de compresion el ${fechaHoy}`)

        const instanciaZip = new AdmZip();
        const directorio = leerContenidoDirectorio(urlPathZip);
        const archivosAFiltrar = filtrarArchivos(directorio, 'all');
        const fechaCreacionArchivo = new Map();

        archivosAFiltrar.forEach((archivo) => {
            const rutaArchivo = path.join(urlPathZip, archivo)
            const fechaCreacion = obtenerFechaCreacion(rutaArchivo);

            fechaCreacionArchivo.set(archivo, fechaCreacion)
            //agrega los archivos
            instanciaZip.addLocalFile(rutaArchivo);
        })

        // Obtén la fecha más reciente de los archivos
        const fechaMasReciente = obtenerFechaMasReciente([...fechaCreacionArchivo.values()]);

        // Formatea la fecha en el formato deseado para el nombre de la carpeta
        const nombreCarpetaFecha = formatearFecha(nombreCarpetaOrigen, fechaMasReciente);


        crearCarpeta(nombreCarpetaFecha)

        const rutaArchivoZip = path.join(nombreCarpetaFecha, nombreArchivoZip)
        //Crea el archivo zip
        instanciaZip.writeZip(rutaArchivoZip);
        console.log(`Terminado el proceso de Compresion el ${fechaHoy}`);

        return {
            mensaje: "Carpeta comprimida correctamente.",
            validacion: true,
            carpetaCreada: rutaArchivoZip,
            directorioCarpeta: nombreCarpetaFecha,
        };
    } catch (error) {
        return {
            mensaje: `Error al comprimir la carpeta: ${error}`,
            validacion: false,
        };
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
