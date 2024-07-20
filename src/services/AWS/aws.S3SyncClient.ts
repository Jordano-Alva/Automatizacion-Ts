import { S3SyncClient, TransferMonitor } from 's3-sync-client'
import { createS3Client, dataConexion } from './aws.config'
import dotenv from 'dotenv';
import { CreateBucketCommand, ListBucketsCommand } from '@aws-sdk/client-s3';
import { formatSize, progresoBarra } from '../../utils/utils';
import { compresionZip } from '../adm-zip';
import { enviarCorreo } from '../../config/nodemailer';
import { variablesEntorno } from '../../config/env';
dotenv.config();

const dataAws = dataConexion(1);
const S3Client = createS3Client(dataAws);

const { sync } = new S3SyncClient({ client: S3Client })

const { AWS_BUCKET_NAME_JORDANO: AWS_BUCKET_NAME } = variablesEntorno



/**
 * Enumera los nombres de todos los depósitos de S3 asociados con las credenciales de AWS configuradas.
 *
 * @returns {Promise<string[]>} Una matriz de nombres de depósitos o arroja un error si no se pudo obtener la lista.
 */
export async function listarBuckets() {
    try {
        const listBucketsCommand = new ListBucketsCommand();
        const { Buckets } = await S3Client.send(listBucketsCommand);

        if (!Buckets) throw new Error('No se pudo obtener la lista de Buckets')

        return Buckets?.map((Bucket) => Bucket.Name)

    } catch (error) {
        throw new Error(`Error en Listar Buckets${error}`);
    }
};


/**
 * Procesa y envía archivos a un depósito de AWS S3.
 *
 * Esta función realiza los siguientes pasos:
 * 1. Comprueba si el depósito de AWS S3 configurado existe y lo crea si no es así.
 * 2. Comprime archivos usando la función `compresionZip`.
 * 3. Sincroniza los archivos comprimidos con el bucket de AWS S3 mediante la función `sincronizacionAws`.
 * 4. Envía una notificación por correo electrónico con la lista de archivos cargados o cualquier error ocurrido durante el proceso.
 *
 * @returns {Promise<void>} Una promesa que se resuelve cuando se completa el procesamiento y la carga del archivo.
 * @throws {Error} Si hay algún error durante el procesamiento o la carga del archivo.
 */
export async function procesamientoYenvioArchivos() {

    try {
        const validacionBucket = await listarBuckets();
        if (!validacionBucket) {
            throw new Error(`No se pudo validar el bucket`)
        }
        const resultados = await compresionZip();
        let archivoCreado: string[] = [];
        const errores: string[] = [];

        for (const resultado of resultados) {
            const { mensaje, validacion, carpetaCreada, directorioCarpeta } = resultado;

            if (validacion) {
                const res = await sincronizacionAws(directorioCarpeta!)

                if (res) {
                    Object.entries(res).forEach(([key, value]) => {
                        value.forEach((val) => archivoCreado.push(val.id));
                    });
                } else {
                    console.log('no se pudo sincronizar')
                    errores.push(`Existe problemas con la sincronizacion de AWS`)
                    return false
                }
            } else {
                errores.push(mensaje)
                console.log(`\nError en la validacion de compresion`)
            }
        }

        if (archivoCreado.length > 0) {
            await enviarCorreo({ destinatario: process.env.CORREO_NOTIFICACION!, archivo: archivoCreado, carpeta: validacionBucket?.toString() }, 1)
        }

        if (errores.length > 0) {
            await enviarCorreo({ destinatario: process.env.CORREO_NOTIFICACION!, mensajeError: errores.join(", ") }, 2)
            throw `Se detecto errores en el proceso`

        }

    } catch (error) {
        throw `\nError en preparacion`
    }
}


/**
 * Sincroniza archivos desde un directorio local a un depósito de AWS S3.
 *
 * @param {string} carpetaSincronizar - El directorio local a sincronizar.
 * @param {string} [nombreBucket=AWS_BUCKET_NAME!] - El nombre del depósito de AWS S3 al que se sincronizará.
 * @returns {Promise<{ creado: LocalObject[], actualizado: LocalObject[], eliminado: LocalObject[] }>}: un objeto que contiene los archivos que se crearon, actualizaron y eliminaron durante la sincronización.
 * @throws {Error} - Si hay algún error durante el proceso de sincronización.
 */
async function sincronizacionAws(carpetaSincronizar: string, nombreBucket: string = AWS_BUCKET_NAME!) {
    try {

        const monitor = new TransferMonitor()
        let ultimoProgreso = -1
        monitor.on('progress', (progress) => {
            const { size: { current, total } } = progress
            const porcentaje = Math.round((current / total) * 100);

            if (porcentaje !== ultimoProgreso) {
                const currentSize = formatSize(current);
                const totalSize = formatSize(total);
                // const mbRestantes = mbTotales - mbSubidos;

                const barraProgreso = progresoBarra(porcentaje, 20);

                let mensaje = `\rSubiendo:[${barraProgreso}] ${porcentaje}%  ${currentSize} / ${totalSize} `;

                const longitudMensajeMaximo = 80;

                if (mensaje.length < longitudMensajeMaximo) {
                    const espacios = " ".repeat(longitudMensajeMaximo - mensaje.length);
                    mensaje += espacios
                }

                process.stdout.write(mensaje);

                ultimoProgreso = porcentaje;


            }

        });

        const res = await sync(carpetaSincronizar, `s3://${nombreBucket}`, { monitor, filters: [{ exclude: (key) => key.endsWith('.txt') }] })
        return res;
        //ejemplo de res:
        // {
        //     created: [
        //       LocalObject {
        //         id: 'prueba.txt',
        //         size: 0,
        //         lastModified: 1716511208396.032,
        //         isExcluded: false,
        //         path: '\\Users\\Asus\\Downloads\\Zip2\\prueba.txt'
        //       }
        //     ],
        //     updated: [],
        //     deleted: []
        //   }
    } catch (error) {
        console.log(error)
        throw new Error(`Error en sincronizacionAws: ${error}`)
    }
}
