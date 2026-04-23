Documentación de decisiones de arquitectura:

· Componentes principales:
    - Pantall de bienvenida: es lo primero que se verá, contiene el menú para crear una cuenta nueva.

    - Marco de la aplicación: Es la estructura que aparece cuando inicias sesión/registrarse, mantiene el menú fijo.

    - Menú lateral: podrás entrar a ver las contraseñas y cerrar sesión.

        - Barra de herramientas: el buscador de contraseñas.

        - Panel de contenido: donde aparecera las tarjetas con las cuentas o categorias.

· Componentes Reutilzables: 
    - La caja de texto segura para escribir la contraseña.
    - Un medidor de contraseña segura.
    - La tarjeta donde estara el usuario y la ocntraseña, los botones para copiar o borrar.
    - Ventana de mensaje por rsi quieres eliminar o para pedir la llave de acceso.
    - boton estandar ya sea para guardar, cancelar o generar.

· Gestión de la apliación
    - Tiene que recordar siempre quien eres y que carpetas tienes creadas en tu cuenta y que no se borren si cierras sesión o te mueves a otra pantalla.

    - La llave de acceso solo se guardara en la memoria mientras la usas, el usuario debe recordar su clave de acceso para ver la contrseña.

· backend/API
    - POST/entrar: Envía los datos de acceso.
    - GET/ mis-carpetas: Pide la lista de categoria creadas.
    - POST/ guardar-clave: Envía una nueva contraseña (encriptada) al serrvidor.

· Persistencia
    - En el servidor: se guardan las cuentas del usaurio y las contraseñas encriptadas.
    - En el cliente: se guarda el permiso de entradas para que el usuario no tenga que poner su correo.

· Seguridad de las contraseñas:
    - Las contraseñas se encriptaran en el ordenador del usuario.
    - La llave de acceso con la cual podrá ver las contraseñas el usuario tiene que recordarlo siempre, si no lo pone la llave, la aplicación no puede mostrar los datos.

· Diagrama de flujo de datos:
    - Cuando guardas unas contraseña: 
        - el usuario rellena los datos de la cuenta, lo guarda y la app usa la clave de acceso.
    - el API envia una petición segura al servidor con el texto ya cifrado.
    - en el backend el servidor recibe el codigo, verificia que la sesion es valida y lo anota en la base de datos.

    - Cunado quieres ver una contraseña:
        - El frontend le pide al servidor los datos de una contraseña.
        - el backend envia el texto cifrado que tiene guardado.
        - el frontend recibe ese codigo pero no lo enseña hasta que pongas la llave de acceso.
        - una vez que pones la llave, el fronted traduce el codigo y te muestra la contraseña en pantalla.
