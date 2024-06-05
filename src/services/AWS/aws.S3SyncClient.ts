import { S3SyncClient, TransferMonitor } from 's3-sync-client'
import { createS3Client, dataConexion } from './aws.config'
import dotenv from 'dotenv';
import { ListBucketsCommand } from '@aws-sdk/client-s3';
import { formatSize, progresoBarra, validacionBucket } from '../../utils/utils';
import { compresionZip } from '../adm-zip';
import { barraProgress, barraProgressAws } from '../../utils/cli-Progress';
dotenv.config();

const dataAws = dataConexion(1);
const S3Client = createS3Client(dataAws);

const { sync } = new S3SyncClient({ client: S3Client })

export async function listarBuckets() {
    try {
        const listBucketsCommand = new ListBucketsCommand();
        const { Buckets } = await S3Client.send(listBucketsCommand);

        if (!Buckets) throw new Error('No se pudo obtener la lista de Buckets')

        const listaBuckets = Buckets?.map((Bucket) => Bucket.Name)
        // const listDos = listaBuckets?.join("\n")
        const validacion = validacionBucket(Buckets)

        if (validacion) {
            console.log({ validacion });
            console.log(`Buckets: ${listaBuckets}`);
            return { mensaje: listaBuckets, validacion: true };
        } else {
            return { mensaje: "No existen buckets", validacion: false };
        }
    } catch (error) {
        console.log(`Error en Listar Buckets: ${error}`);
    }
};


export function preparacionZip() {

    try {

        const resultados = compresionZip();

        resultados.forEach((resultado) => {
            const { mensaje, validacion, carpetaCreada, directorioCarpeta } = resultado;
            if (validacion) {
                // console.log(`Carpeta creada: ${carpetaCreada}`);
                // console.log(`Directorio de la carpeta: ${directorioCarpeta}`);
                sincronizacionAws(directorioCarpeta!)
            } else {
                console.error(`Error: ${mensaje}`);
            }
        });
    } catch (error) {
        console.log('Error en preparación de carpeta zip:', error);
    }
}

//si funciona la sincronizacion, ver como sacar el loading y valdiar la sincronizacion completa
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
        const res = await sync(carpetaSincronizar, 's3://my-aws-bucket-backup', { monitor,  partSize: 100 * 1024 * 1024  })
        // console.log(res)
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
    }
}
