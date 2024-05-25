import { S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv';
dotenv.config();

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

export const createS3Client = (dataAws: EnvAws) => {
    return new S3Client({
        region: dataAws.region,
        credentials: {
            accessKeyId: dataAws.credentials.accessKeyId,
            secretAccessKey: dataAws.credentials.secretAccessKey
        }
    })
}


export const dataConexion = (numero: number) => {
    return dataEnvPruebas[`datos${numero === 1 ? "Jordano" : "Alex"}`]
}
