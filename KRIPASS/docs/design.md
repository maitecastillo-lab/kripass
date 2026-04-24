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

Capa de red (frontend)

Toda la comunicación con el backend pasa por un único archivo `src/api/client.ts`. Uso **axios** porque es más cómodo que fetch y maneja los errores de forma más clara. La URL base se lee de una variable de entorno (`VITE_API_URL`), así en desarrollo apunta a `localhost:4000` y en producción a Render, sin cambiar código.

Cliente:

```typescript
const instance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const passwordClient = {
  getAll: () => instance.get('/'),
  create: (data: PasswordAccount) => instance.post('/', data),
  update: (id, data) => instance.put(`/${id}`, data),
  delete: (id) => instance.delete(`/${id}`),
};
```

Contrato de tipos

El tipo `PasswordAccount` está definido en el cliente y coincide con el modelo de Mongoose del backend. Si cambio un campo en el backend, lo cambio también aquí. Este es el "contrato":

```typescript
interface PasswordAccount {
  id?: number | string;
  site: string;
  username: string;
  password?: string;
  category: string;
}
```

## Estados de red en la UI

En la UI gestiono los 3 estados de cualquier petición:

- Loading:muestro un spinner (`Loader2` de lucide) mientras se cargan los datos.
- Success: cuando llegan los datos, los renderizo en pantalla.
- Error: si el servidor falla, muestro un mensaje con un botón "Reintentar conexión".

Ejemplo en `FolderDetail`:

```tsx
if (cargando) return ;
if (error) return ;
return ;
```

Los datos que viven en el backend (contraseñas y carpetas) NO los guardo en localStorage. El backend es la única fuente de verdad: cada vez que entro al dashboard o a una carpeta, pido los datos frescos al servidor.

Lo único que guardo en localStorage es el nombre del usuario logueado, para que la sesión se mantenga al recargar F5.