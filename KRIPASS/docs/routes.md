He configurado la navegación de **KriPass** utilizando la librería `react-router-dom`. La estructura se divide en rutas públicas y privadas para garantizar la seguridad de las contraseñas.

Se utiliza el estado `estaAutenticado` proveniente del `AuthContext` para redirigir automáticamente al usuario:
- Si un usuario no logueado intenta entrar al `/dashboard`, es enviado a `/login`.
- Si un usuario logueado intenta entrar al `/login`, es enviado al `/dashboard`.