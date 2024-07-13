# Nombre del Proyecto
Automatización de subida de archivos en AWS - Bucket

## Descripcion del Proyecto
Este proyecto automatiza la subida de archivos a un Bucket de AWS S3, proporcionando una solución eficiente para la gestión de archivos en la nube. Incluye capacidades de monitoreo con Sentry y envíos de notificaciones por correo electrónico utilizando Nodemailer

## Funciones Principales
- **Subida de Archivos a  S3:** Automatiza la carga de archivos al Bucket de AWS S3 configurado.
- **Monitoreo de Errores:** Integra Sentry para el seguimiento y monitoreo de errores en el código.
- **Notificaciones por Correo Electrónico:** Utiliza Nodemailer para enviar notificaciones por correo electrónico en caso de errores o eventos importantes.


## Instalación

### Clonar el repositorio
`git clone https://github.com/Jordano-Alva/Automatizacion-Ts.git`

### Instalar dependencias
`npm install`

### Creación de archivo .env

Dentro del directorio, copiar el `.env.template` y renombrarlo a `.env`. Modificar los valores del archivo `.env` a los correspondientes.

Considerar que se debe contar con una cuenta de [AWS](https://aws.amazon.com/) y contar con un Bucket en [AWS S3](https://aws.amazon.com/s3/). Además, es necesario tener los accesos respectivos de lectura y escritura en [AWS IAM](https://aws.amazon.com/iam/):

- **Lectura:**
  - GetObject
- **Escritura:**
  - PutObject
- **Lista:**
  - ListBucket
  - ListAllMyBuckets

Se debe contar con una cuenta de [Sentry](https://sentry.io/) para el monitoreo de código.

Se debe contar con una cuenta para envio de correos que puede ser configurado con cualquier servicio de correo electrónico.


### Ejecutar
- `npm run build`
- `npm run start`

## Complementos

- [AWS](https://aws.amazon.com/) - Servicio en la nube
- [AWS S3](https://aws.amazon.com/s3/) - Servicio de almacenamiento de objetos en la nube
- [Sentry](https://sentry.io/) - Monitoreo de código
- [Nodemailer](https://nodemailer.com/) - Envío de correos

