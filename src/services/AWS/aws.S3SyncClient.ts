import { S3SyncClient, TransferMonitor } from 's3-sync-client'
import { createS3Client, dataConexion } from './aws.config'
import dotenv from 'dotenv';
import { CreateBucketCommand, ListBucketsCommand } from '@aws-sdk/client-s3';
import { formatSize, progresoBarra } from '../../utils/utils';
import { compresionZip } from '../adm-zip';
import { enviarCorreo } from '../../nodemailer';
dotenv.config();

const dataAws = dataConexion(1);
const S3Client = createS3Client(dataAws);

const { sync } = new S3SyncClient({ client: S3Client })

export async function listarBuckets() {
    try {
        const listBucketsCommand = new ListBucketsCommand();
        const { Buckets } = await S3Client.send(listBucketsCommand);
        // const crearBucket = new CreateBucketCommand({"Bucket": 'prueba'})
        // const response = await S3Client.send(crearBucket);

        if (!Buckets) throw new Error('No se pudo obtener la lista de Buckets')

        //TODO: Considera crear el bucket
        //TODO: validar el bucket

        return Buckets?.map((Bucket) => Bucket.Name)

        // const listaBuckets = Buckets?.map((Bucket) => Bucket.Name)
        // // const listDos = listaBuckets?.join("\n")
        // const validacion = validacionBucket(Buckets)

        // if (validacion) {
        //     console.log({ validacion });
        //     console.log(`Buckets: ${listaBuckets}`);
        //     return { mensaje: listaBuckets, validacion: true };
        // } else {
        //     return { mensaje: "No existen buckets", validacion: false };
        // }
    } catch (error) {
        throw new Error(`Error en Listar Buckets${error}`);
    }
};


export async function preparacionZip() {

    try {
        //!Debo validar que exista el bucket, si no existe debo crearlo
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
            //!en la opcion carpeta, debo retornar Bucket, modificar lo del correo
            await enviarCorreo({ destinatario: "jordanoalvaradoc@gmail.com", archivo: archivoCreado, carpeta: validacionBucket?.toString() }, 1)
        }

        if (errores.length > 0) {
            // await enviarCorreo({ destinatario: "jordanoalvaradoc@gmail.com", mensajeError: resultados[0].mensaje }, 2)
            await enviarCorreo({ destinatario: "jordanoalvaradoc@gmail.com", mensajeError: errores.join(", ") }, 2)
            throw `Se detecto errores en el proceso`

        }

    } catch (error) {
        // console.log('Error en preparación de carpeta zip:', error);
        throw `\nError en preparacion`
    }
}

async function sincronizacionAws(carpetaSincronizar: string) {
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
            // console.log(`Current Size: ${current}, Total Size: ${total}`);
        });
        // const res = await sync(`${process.env.HOMEPATH}\\Downloads\\Zip2`, 's3://my-aws-bucket-backup', { monitor })
        const res = await sync(carpetaSincronizar, 's3://my-aws-bucket-backup', { monitor })
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
