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
### Header Necesario
![image](https://user-images.githubusercontent.com/36666070/223718151-6dd47a5f-63e6-4964-b457-51986665078f.png)

### Datos del usuario a registrar:
![image](https://user-images.githubusercontent.com/36666070/223437611-ba14fc07-5876-4f51-8ad9-1f9caa9e0b1f.png)

### Respuesta
![image](https://user-images.githubusercontent.com/36666070/223438595-460c40ca-aa9a-4496-9063-5e073e1675c8.png)


Nota: Si en la respuesta recibes un código 2 es porque el usuario ya existe en la bd y si recibe un error de php revise el request está poniendo un campo mal. La ubicación no se enviara a la API, sino que se guardara de forma local aparte de los datos del usuario.

### Paso 3: Login
Constará de un formulario que pide correo y contraseña, la información se enviara al endpoint https://api.lancergroup.org/likeride/api/Auth/Get_ToketLogin y al igual que en registro se debe guardar la respuesta del servidor en el almacenamiento local y proceder a la página de detalles del usuario.

### Request y respuesta del login
![image](https://user-images.githubusercontent.com/36666070/223439889-d04a9681-4381-4721-94c7-13ce5377e3c6.png)

Nota: Si recibes un código 2 es porque la clave es incorrecta y 3 es porque el usuario no existe en la db.

### Paso 4: Perfil del usuario
Aquí se debe de mostrar la información del usuario que se tiene guardada, el diseño de la interfaz está a su discrecion.
Además, se debe incluir un boton de cerrar sesion el cual limpiara la data guardada localmente y te devolvera al login

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
