Rutas y navegación

He configurado la navegación de KRIPASS utilizando la librería `react-router-dom`. La estructura se divide en rutas públicas y privadas para garantizar la seguridad de las contraseñas.

Paginas de la aplicación:
He creado 4 páginas principales, cada una con su archivo en `src/pages/`:

-Dashboard.
-folderDetail
-loginPage
-notFoundPage

Configuración de las rutas

Todas las rutas están definidas en `App.tsx`, usando `BrowserRouter`, `Routes` y `Route`.


Uso el estado `estaAutenticado` del `AuthContext` para redirigir al usuario:

- Si un usuario no logueado intenta entrar a `/dashboard`, es enviado a `/login`.
- Si un usuario logueado intenta entrar a `/login`, es enviado al `/dashboard`.

Para esto uso el componente `<Navigate>` de React Router.

Página 404

Si el usuario entra a una URL que no existe, se muestra la página 404 en lugar del error del navegador. La ruta captura cualquier URL no reconocida.