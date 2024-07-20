import 'dotenv/config'

interface ProcessEnv {
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;

    CORREO_NOTIFICACION: string;

    RUTA_CARPETA: string;
    NOMBRE_CARPETA: string;
    NOMBRE_CARPETA_A_CREAR: string;

    AWS_BUCKET_NAME: string
    AWS_BUCKET_REGION: string
    AWS_BUCKET_USER: string
    AWS_BUCKET_PASSWORD: string
    AWS_BUCKET_PUBLIC_KEY: string
    AWS_BUCKET_SECRET_KEY: string

    DSN_SENTRY: string
    DSN_ENVIROMENT: string
}


const varEnvRequeridas: { [key: string]: string } = {
    EMAIL_HOST: 'EMAIL_HOST',
    EMAIL_PORT: 'EMAIL_PORT',
    EMAIL_USER: 'EMAIL_USER',
    EMAIL_PASSWORD: 'EMAIL_PASSWORD',
    CORREO_NOTIFICACION: 'CORREO_NOTIFICACION',
    RUTA_CARPETA: 'RUTA_CARPETA',
    NOMBRE_CARPETA: 'NOMBRE_CARPETA',
    NOMBRE_CARPETA_A_CREAR: 'NOMBRE_CARPETA_A_CREAR',
    DSN_SENTRY: 'DSN_SENTRY',
    DSN_ENVIROMENT: 'DSN_ENVIROMENT'
}

const prefijoAws: string = 'AWS_BUCKET_';

/**
 * Valida las variables de entorno requeridas y devuelve un objeto con las variables de entorno válidas.
 *
 * @param varRequeridas: un objeto con los nombres de variables de entorno requeridos como claves y sus claves Process.env correspondientes como valores.
 * @param prefijo: un prefijo para comprobar si hay variables de entorno adicionales.
 * @param ProcessEnv: el objeto Process.env que contiene las variables de entorno.
 * @returns Un objeto con las variables de entorno válidas.
 * @throws Error si falta alguna variable de entorno requerida.
 */
const validacionVarEnv = (varRequeridas: { [key: string]: string }, prefijo: string, processEnv: NodeJS.ProcessEnv) => {

    const varEnvFaltantes: string[] = [];
    const varEnValidas: { [key: string]: string | undefined } = {};

    for (const [key, value] of Object.entries(varRequeridas)) {
        if (!processEnv[value]) {
            varEnvFaltantes.push(value);
        } else {
            varEnValidas[key] = processEnv[value];
        }
    };

    for (const [key, value] of Object.entries(processEnv)) {
        if (key.startsWith(prefijo) && !value) {
            varEnvFaltantes.push(key);
        } else {
            varEnValidas[key] = value
        }
    }

    if (varEnvFaltantes.length > 0) {
        throw new Error(`Falta configurar las siguientes variables de entorno: ${varEnvFaltantes.join(', ')}`)
    }

    return varEnValidas;
}


const variablesEntorno = validacionVarEnv(varEnvRequeridas, prefijoAws, process.env)

export { variablesEntorno };

