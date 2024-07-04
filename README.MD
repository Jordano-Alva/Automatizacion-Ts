# Nombre del Proyecto
Automatización de subida de archivos en AWS - Bucket

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

## Complementos

- [AWS](https://aws.amazon.com/) - Servicio en la nube
- [AWS S3](https://aws.amazon.com/s3/) - Servicio de almacenamiento de objetos en la nube
- [Sentry](https://sentry.io/) - Monitoreo de código
- [Nodemailer](https://nodemailer.com/) - Envío de correos

