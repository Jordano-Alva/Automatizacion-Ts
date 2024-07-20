import { S3Client } from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import https from 'https';
import dotenv from 'dotenv';
import { variablesEntorno } from '../../config/env';

//TODO: DEBO SACAR LAS VARIABLES DE ENTORNO DE UNA MANERA GENERALIZADA

dotenv.config();

const {AWS_BUCKET_NAME,AWS_BUCKET_REGION, AWS_BUCKET_PUBLIC_KEY, AWS_BUCKET_SECRET_KEY } = variablesEntorno
/**
 * Crea un controlador HTTP personalizado para AWS SDK, configurando el agente HTTPS con las siguientes configuraciones:
 * - `keepAlive`: habilita el mantenimiento de conexión HTTP, lo que puede mejorar el rendimiento al reutilizar las conexiones TCP existentes.
 * - `maxSockets`: establece el número máximo de sockets en 300, que se puede ajustar según la carga de carga.
 * - `timeout`: establece el tiempo de espera de inactividad del socket en 60 segundos, después de los cuales se cerrarán los sockets inactivos.
 * - `socketAcquisitionWarningTimeout`: establece el tiempo de espera de advertencia para adquirir sockets en 2 segundos, que se puede ajustar según sea necesario.
 *
 * @returns Una instancia `NodeHttpHandler` configurada para usar con AWS SDK.
 */
const httpHandler = new NodeHttpHandler({
    httpsAgent: new https.Agent({
        keepAlive: true,
        maxSockets: 300,//Se aumenta segun la carga de subida
        timeout: 60000,//El tiempo que se debe antes de cerrar un socket inactivo
    }),
    socketAcquisitionWarningTimeout: 2000//Ajustar tiempo para que se emita una adverntencia
})


interface EnvAws {
    region: string;
    Bucket: string;
    credentials: {
        accessKeyId: string;
        secretAccessKey: string;
    };
}

interface EntornoPruebas {
    datosJordano: EnvAws;
    datosAlex: EnvAws;
}


/**
 * Define la configuración para el entorno de AWS, incluida la región, el nombre del depósito y las credenciales para dos fuentes de datos diferentes (Jordano y Alex).
 * Esta configuración se utiliza para crear un cliente S3 para interactuar con el servicio AWS S3.
 */

const dataEnvPruebas: EntornoPruebas = {
    //* 1 =Jordano, 2 = Alex
    datosJordano: {
        region: process.env.AWS_BUCKET_REGION_JORDANO || '',
        Bucket: 'Jordano',
        credentials: {
            accessKeyId: process.env.AWS_BUCKET_PUBLIC_KEY_JORDANO || '',
            secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY_JORDANO || ''
        }
    },

    datosAlex: {
        region: process.env.AWS_BUCKET_REGION_ALEX || '',
        Bucket: 'Alex',
        credentials: {
            accessKeyId: process.env.AWS_BUCKET_PUBLIC_KEY_ALEX || '',
            secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY_ALEX || ''
        }
    }
}

/**
 * Creates an S3 client with the provided AWS configuration.
 *
 * @param dataAws - The AWS configuration object containing the region, access key ID, and secret access key.
 * @returns An S3 client instance configured with the provided AWS credentials and settings.
 */
export const createS3Client = (dataAws: EnvAws) => {
    return new S3Client({
        region: dataAws.region,
        credentials: {
            accessKeyId: dataAws.credentials.accessKeyId,
            secretAccessKey: dataAws.credentials.secretAccessKey
        },
        requestHandler: httpHandler
    })
}


/**
 * Recupera el objeto de configuración de AWS para la fuente de datos especificada (Jordano o Alex).
 *
 * @param numero: el número que representa la fuente de datos (1 para Jordano, 2 para Alex).
 * @returns El objeto de configuración de AWS para la fuente de datos especificada.
 */
export const dataConexion = (numero: number) => {
    return dataEnvPruebas[`datos${numero === 1 ? "Jordano" : "Alex"}`]
}
