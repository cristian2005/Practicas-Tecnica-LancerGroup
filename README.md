# Practicas Tecnica LancerGroup para Candidatos a Frontend / Mobile con Ionic Angular
Este proyecto esta diseñado para verificar los conocimientos adquiridos en las siguientes tecnologías:

- Angular (8+)
- [Ionic Framework (5+)](https://ionicframework.com/)
- JavaScript ES6
- TypeScript
- APIs del Navegador
- CSS
- [Capacitor JS (3+)](https://capacitorjs.com/)
- Habilidades investigacionales (lectura de documentación)
- Manejo de librerias de terceros
- Git

## Descripción de la práctica 

Se va a crear un modulo de autenticacion de usuario con registro e inicio de sesion y una pagina para visualizar la informacion basica del usuario registrado

### Paso 1: Recopilar informacion de Registro

Este paso se dividira en tres paginas que pediran diferentes datos del usuario

#### Informacion basica
Un formulario que tendra los siguientes campos (todos requeridos)

 - Nombre (Maximo 30 caracteres)
 - Apellido (Maximo 30 caracteres)
 - Correo (tiene que estar en el formato correcto)
 - Numero de telefono (10 numeros, sin guiones)
 - Contraseña (Minino 8 caracteres, maximo 16 caracteres, debe contener al menos una letra y un numero)
 - Confirmacion de contraseña

#### Ubicacion
Esta pagina contendra un boton el cual cargara la ubicacion del usuario y la guardara junto a la data del formulario de la pagina anterior, aqui se debe de utilizar el plugin de [Geolocation de Capacitor](https://capacitorjs.com/docs/apis/geolocation) para pedir las coordenadas

#### Imagen de perfil
Un selector de imagenes (pueden usar una libreria si gustan) que les permita cargar la imagen desde su sistema de archivos y guardarla como un string en base64
junto a la demas data del formulario

### Paso 2: Procesamiento de la informacion de registro
Al tener toda la data de registro, la informacion se enviara al endpoint https://api.lancergroup.org/likeride/api/Auth/Register para completar el registro, una vez recibida una respuesta satisfactoria se procedera a guardar la respuesta del servidor de manera local utilizando la libreria de [Ionic Storage](https://github.com/ionic-team/ionic-storage) y se procedera a la pagina donde se muestra la informacion basica del perfil creado.

Nota: la ubicacion no se enviara a la API, sino que se guardara de forma local aparte de los datos del usuario

### Paso 3: Login
Constara de un formulario que pide correo y contraseña, la informacion se enviara al endpoint https://api.lancergroup.org/likeride/api/Auth/Get_ToketLogin y al igual que en registro se debe guardar la respuesta del servidor en el almacenamiento local y proceder a la pagina de detalles del usuario.

### Paso 4: Perfil del usuario
Aqui se debe de mostrar la informacion del usuario que se tiene guardada, el diseño de la interfaz esta a su discrecion.
Ademas se debe incluir un boton de cerrar sesion el cual limpiara la data guardada localmente y te devolvera al login

### Paso 5: Mejoras
Una ves terminada la funcionalidad principal, procederan a implementar estas mejoras:

  - Agregar un Guard para evitar acceder a la pagina de perfil sin estar registrados
  - Agregar autenticacion Biometrica utilizando [este plugin para capacitor](https://www.npmjs.com/package/capacitor-native-biometric) (esto requerira compilar la app en un dispositivo fisico para funcionar)


## ¿Qué se tomará en cuenta?

 - Estructura de los directorios
 - Calidad del codigo
 - UI / UX
 - Diseño de la base de datos
 - Uso de librerias de terceros
 - Convenciones a la hora de nombrar commits, se debe de utilizar [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)

## Detalles de las asignaciones técnicas

 - La palabra clave DEBE significa que el enunciado es requerido y no puede alterarse.
 - La palabra clave NECESITA signifca que el enunciado es requerido, pero la ejecución está a libre interpretación.
 - La palabra clave PUEDE significa que el requisito no es necesario, no se tomará en cuenta en la puntuación, pero que sirve para practicar algo que podrías (o no) ver en el entorno laboral. 
