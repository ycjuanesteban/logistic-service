# Juan Esteban Yarce Carmona

## Prueba 1

La aplicación cuenta con tres proyectos:
 - bill
 - logistic
 - checkout

De estos tres proyectos dos son los servicios que contienen lógica de negocios (bill y logistic) y checkout es un servicio tipo BFF (backend for front end) que se encarga de orquesta llamadas a múltiples servicios.

En esta prueba se podrá ver el uso de CQRS, TypeORM para el acceso a base de datos, DDD, entre otros conceptos que se irán exponiendo conforme se explique cada microservicio.
***
## Decisiones
Para la creación del proyecto se usó NestJS y con su CLI se creó un tipo de proyecto monorepo en el cual se puede hacer un seguimiento de todas las posibles apps y librerias que se vayan a usar y con un solo archivo de configuración (package.json) se pueden ejecutar y administrar todos las apps.

A nivel general, se usó lo siguiente:
 
- NestJS  - Framework de NodeJS que nos permite crear y ejecutar la aplicación web.
- TypeORM - Orm para conectar a la base de datos y es quien administra los repositorios y el contexto.
- Swagger - para documentar la API.
- CQRS    - este patron permite separar las capas de aplicación de la capa de api y así no generar una dependencia entre las mismas.

### Bill service:

Este proyecto se divide en:
- **API**: en esta capa se encentran los controladores de la aplicación.
- **Aplicación**: En esta capa se encuentran la lógica de la aplicación, aquí se crearon los servicios de mapeo entre los dtos y las entidades de base de datos y el handler que es quien administra la lógica de la aplicación.
- **Acceso a datos**: Aquí se instancia el DataAcces y es donde se definen los repositios genericos a usar en la aplicación.

Esta aplicación tiene un módulo llamado *bill.module.ts* que es donde se encapsula toda la lógica de esta aplicación, luego este es usado por el módulo *main.module.ts* que lo instancia y además hace uso del paquete *ConfigModule* de NestJS para la administración de las variables de entorno.
Finalmente, la aplicación es ejecutada desde el archivo *main.ts* que es quien instancia la aplicación, agrega los pipelines de validación y un filtro para las excepciones hecho a medida, agrega el prefijo *api* globalmente, el versionamiento de los endpoints y agrega swagger para la documentación de la aplicación.

### Logistic service

Este proyecto, en general, usa el mismo esquema de capas que el proyecto de bill (API, Aplicación y Acceso a datos).
Pero en este caso el proyecto Logistic tiene un enfoque más DDD. Esto se puede ver en la capa de *Aplicación*, allí hay una carpeta llamada *dominio* con contiene clases que representan las entidades de la base de datos. 
Estas se diferencian de las entidades porque las clases de dominio no son agnosticas y tienen lógica interna que permite hacer la creación segura de una entidad, métodos set con lógica para garantizar la validez de los datos y evitar así que el objeto se cree con un estado erroneo.

Finalmente, la transformación de las entidades de dominio a entidades de base de datos (por llamarlas de alguna forma) se hace dentro de la entidad de dominio ya que esta es quien conoce el cómo se debe hacer la transformación y no delegar esta tarea a un servicio o mapeador externo.

### Checkout

Este proyecto se encarga de recibir del usuario, la información para la creación de del pedido y su posterior "envio".
Este proyecto solo cuenta con dos capas, Api y Aplicación ya que por defecto no tiene acceso a base de datos.
La comunicación con los servicios se *bill* y *logistic* se hace a travez del protocolo http y para esto se crearon dos servicios que encapsulan las llamadas.

Consideraciones generales:
- Se creo una librería de clases y extensiones compartidas para reutilizar en lo posible funcionalidad. Aquí se puede encontrar, por ejemplo, un controlador base, la configuracion básica de swagger y el filtro de excepciones custom creado.
- Para las apis/microservicios se usó la división por capas lógicas
- CQRS y la implementación que NestJS expone para este patrón con el fin de separar responsabilidades y no hacer instanciaciones de clases entre capas.
- Inyección de dependencias para seguir el patron de inversión de control inyectando en los handler servicios y repositorios cuando así fue necesario.
- Los modelos de ambas apis (bill y logistic) son testimoniales, esto quiere decir que cumplen con lo básico requerido y en el caso de logistic se crea una entidad *shipping* con el fin de señalar la ejecución del envio pero a esta entidad le faltan más atributos que la permitan ser realmente operativa.
- Cada microservicio tiene un docker y hay un docker compose que al ser ejecutado crea las imágenes y ejecuta los contenedores de los microservicios más el contenedor de MySQL que es el motor de base de datos seleccionado.

## Mejoras y otras ideas

- La creación del proyecto basado en Monorepo me trajo varios problemas con TypeORM. Para una versión futura evitaria usar la versión de monorepo expuesta por NestJS y crearía las aplicaciones aisladas una de la otra. 
- Implementar migraciones y usar una librería para los seeds de la base de datos. Esta parte no se pudo completar por los problemas presentados con TypeORM y el contexto que este maneja y la forma como se creó la aplicación 
- La librería de *shared* o *commons* la crearía como un paquete npm y así se podría hacer una mejor versión y gestion, además sería de acceso "publico" para todo el equipo de desarrollo.

## Modo de uso

Es necesario tener previamente intalado NPM y Docker en la máquina donde se va a ejecutar el proyecto.

Comandos para ejecutar: Estos comandos se deben ejecutar desde la carpeta raíz.
- *npm i -g pnpm*
- *pnpm i*
- *pnpm run start:dev [NOMBRE API]*: ejemplo *pnpm run start:dev logistic*

Para ejecutar una sola aplicación debe tener ejecutando MySQL en la máquina, si se va a hacer de esta forma se sugiere que se ejecuta el comando *docker-compose up -d db* y este solo ejecutará la base de datos

Para ejecutar las tres aplicaciones con docker
- *docker-compose up --build*

Para detener y eliminar las imágenes creadas se puede usar el siguiente comando:
- *docker-compose down --rmi local*

Después de haber ejecutado el comando de docker compose, los servicios se pueden acceder desde las siguientes URLs
- checkout: *http://localhost:3000/swagger*
- bill: *http://localhost:3001/swagger*
- logistic: *http://localhost:3002/swagger*
