# Automatización de Subida de Archivos a AWS S3

## Descripción del Proyecto

Este proyecto proporciona una herramienta automatizada para subir archivos a un bucket de AWS S3, facilitando la gestión de archivos en la nube de manera eficiente y segura. Incluye características como monitoreo con Sentry y notificaciones por correo electrónico mediante Nodemailer, optimizando la operación y supervisión de las cargas de archivos.

## Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener una cuenta en AWS y crear un bucket en S3. También necesitarás cuentas en Sentry y un servicio de correo electrónico que soporte SMTP para enviar notificaciones.

### Clonar el repositorio

```bash
git clone https://github.com/Jordano-Alva/Automatizacion-Ts.git`
```

### Instalar dependencias

Instala las dependencias necesarias con npm:

```bash
npm install
```

### Configuración de Variables de Entorno

Copia el archivo `.env.template` y crea uno nuevo bajo el nombre de `.env` y configura las variables con tus credenciales:

#### Variables generales

-   CORREO_NOTIFICACION: Correo donde llegara la notificacion del estado del proceso.
-   RUTA_CARPETA: Ruta de carpeta principal.
-   NOMBRE_CARPETA: Carpeta que se encuentran los archivos a subir.
-   NOMBRE_CARPETA_A_CREAR: Nombre de la nueva carpeta que se creara.

#### Variables de correo electrónico

-   EMAIL_HOST: Servidor SMTP.
-   EMAIL_USER: Usuario de correo electrónico.
-   EMAIL_PASSWORD: Contraseña de aplicacion (si es google, ver video) [Video](http://surl.li/jlwgir)
-   EMAIL_PORT= Puerto del servidor SMTP

#### Variables de AWS

AWS_BUCKET_NAME_BUCKET: Nombre del bucket S3
AWS_BUCKET_REGION_BUCKET: Region del bucket
AWS_BUCKET_USER: Usuario configurado en [AWS IAM](https://aws.amazon.com/iam/)
AWS_BUCKET_PUBLIC_KEY: Contraseña publica obtenida del IAM
AWS_BUCKET_SECRET_KEY: Contraseña publica obtenida del IAM

Las variables de entorno de AWS deben iniciar con el prefijo _'AWS*BUCKET*'_

Asegurate de los accesos respectivos de lectura y escritura en [AWS IAM](https://aws.amazon.com/iam/):

-   **Lectura:**
    -   GetObject
-   **Escritura:**
    -   PutObject
-   **Lista:**
    -   ListBucket
    -   ListAllMyBuckets

Se debe contar con una cuenta de [Sentry](https://sentry.io/) para el monitoreo de código.

#### Variables de Sentry

DSN_SENTRY: La url generada por Sentry
DSN_ENVIROMENT: Por defecto se coloca production

[!CAUTION]
De no haber configurado correctamente una variable de entorno, esto arroja un error y cerrara el proceso.

### Ejecutar

Compila el proyecto y ejecuta el proceso con los siguientes comandos:

```bash
npm run build  # Compila el proyecto
npm run start  # Ejecuta la aplicación
```

## Función Principal: procesamientoYenvioArchivos()

### Descripción

`procesamientoYenvioArchivos()` es una función asíncrona que se encarga de validar la existencia de un bucket en AWS, comprimir archivos, sincronizarlos con AWS y enviar notificaciones por correo electrónico sobre el estado del proceso.

### Pasos de la Función

1. **Validación del Bucket:**
    - Se utiliza la función `listarBuckets()` para validar la conexion y existencia del bucket. Si no existe, lanza un error.
2. **Compresión de Archivos:**
    - La función `compresionZip()` se encarga de comprimir los archivos y devolver los resultados de la compresión.
    - **(1) Parametro:**
        1. nombreCarpetaACrear (path:string): Carpeta donde se guardaran los archivos comprimidos y se sincronizara con Aws
3. **Sincronización con AWS:**
    - Para cada archivo comprimido, si la validación es exitosa, se realiza la sincronización con AWS usando la función `sincronizacionAws()`. Si la sincronización falla, se registra un error y se detiene el proceso.
    - **(2) Parametros:**
        1. carpetaSincronizar (string): Ruta a la carpeta que se debe sincronizar con AWS S3.
        2. nombreBucket (string): Nombre del depósito remoto para sincronizar el bucket, este se encuentra dentro de las propiedades del bucket, en la pestaña de propiedades, en información general sobre el bucket 'Nombre de recurso de Amazon (ARN)' ej: arn:aws:s3:::nombreBucket
4. **Notificación por Correo:**
    - La funcion `enviarCorreo()` es una función que se encarga de enviar notificaciones por correo electrónico, esto segun el resultado de subida de archivos:
        - Si se crean archivos exitosamente, se envía una notificación por correo con los detalles.
        - Si se detectan errores durante el proceso, se envía un correo con la lista de errores y se lanza un error.

## Complementos y Herramientas Utilizadas

-   [AWS S3](https://aws.amazon.com/s3/) - Servicio de almacenamiento de objetos en la nube
-   [Sentry](https://sentry.io/) - Herramienta de monitoreo de errores en tiempo real
-   [Nodemailer](https://nodemailer.com/) - Módulo de Node.js para enviar correos electrónicos fácilmente.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE en el repositorio.
