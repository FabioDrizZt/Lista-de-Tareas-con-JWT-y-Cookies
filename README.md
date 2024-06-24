# Lista de Tareas con JWT y Cookies

## Descripción
Este proyecto es un servidor backend construido con Node.js y Express que permite a los usuarios registrarse, iniciar sesión, y gestionar sus tareas (crear, listar y eliminar tareas). El acceso a la gestión de tareas está protegido mediante cookies y sesiones.

## Instalación
1. Clona el repositorio en tu máquina local:
    ```bash
    git clone https://github.com/FabioDrizZt/Lista_de_Tareas_con_JWT_y_Cookies
    cd Lista_de_Tareas_con_JWT_y_Cookies
    ```

2. Instala las dependencias necesarias:
    ```bash
    npm install express express-session cookie-parser body-parser method-override ejs
    ```

## Uso
1. Inicia el servidor:
    ```bash
    node index.js
    ```

2. Accede a la aplicación en tu navegador:
    ```
    http://localhost:3000/register
    ```

## Endpoints
- **GET /register**: Muestra el formulario de registro.
- **POST /register**: Registra un nuevo usuario.
- **GET /login**: Muestra el formulario de inicio de sesión.
- **POST /login**: Autentica al usuario y crea una sesión.
- **POST /logout**: Cierra la sesión del usuario.
- **GET /tareas**: Lista todas las tareas del usuario (ruta protegida).
- **POST /tareas**: Crea una nueva tarea (ruta protegida).
- **DELETE /tareas/:id**: Elimina una tarea por su ID (ruta protegida).

## Comentarios del Código
- **express-session**: Middleware para manejar sesiones.
- **cookie-parser**: Middleware para parsear cookies.
- **body-parser**: Middleware para parsear cuerpos de peticiones.
- **method-override**: Middleware para permitir otros métodos HTTP como PUT y DELETE usando un campo oculto "_method".
