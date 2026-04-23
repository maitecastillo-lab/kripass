# Retrospectiva del proyecto KRIPASS

## Qué he aprendido

Hacer este proyecto me ha servido bastante para entender cómo se conectan de verdad el frontend y el backend. Al principio sabía hacer cada parte por separado, pero juntarlo todo en una sola app que funciona online ha sido más complicado ya que en vercel siempre me cuesta un poco más

En el frontend he reforzado mucho React con TypeScript: usar `useState`, `useEffect`, `useMemo`, `useCallback`, crear custom hooks propios (`useAuth` y `useCredentials`), y manejar Context API para tener la sesión accesible desde cualquier componente sin andar pasando props por todos lados. También me he familiarizado con React Router para organizar la app en varias páginas (login, dashboard, carpetas, 404).

En el backend he trabajado con Express aplicando arquitectura por capas: rutas → controladores → servicios → modelos. Implementé endpoints REST con los verbos GET, POST, PUT y DELETE, devolviendo los códigos HTTP correctos. Al principio guardaba todo en archivos `.json`, pero después migré la base de datos a MongoDB Atlas con Mongoose, lo que me obligó a entender cómo funcionan los modelos, las conexiones y las operaciones asíncronas con `async/await`.

Y sobre la seguridad, aprendí a encriptar las contraseñas con AES-256 antes de guardarlas, de forma que aunque alguien acceda a la base de datos no pueda leer las claves ya que salen otros número menos la clave que es

## Problemas que me encontré

La integración entre frontend y backend fue uno de los puntos que más me costó. Tenía que asegurarme de que las interfaces de TypeScript en el cliente coincidieran con lo que devolvía el backend, y al principio me pasaba de todo: campos `undefined`, errores de CORS, rutas que no existían en el servidor pero el frontend intentaba llamarlas (`/login` y `/register` no estaban creadas), y cosas así. Terminé añadiendo tipos claros (`PasswordAccount`) y un cliente axios con una URL base configurable por variable de entorno, lo que me ahorró problemas después al desplegar.

Otro punto complicado fue la persistencia de la sesión.Cuando hacía F5 me echaba al login porque el contexto se reiniciaba. La solución fue guardar el usuario en `localStorage` dentro del `AuthProvider` y leerlo al cargar la app.

Pero el despliegue fue lo que más me atoró, sin duda. Tuve varios problemas seguidos:

- Subí sin querer el archivo `.env` a GitHub junto con la clave de MongoDB. Tuve que aprender a deshacer commits con `git reset --soft` y arreglar el `.gitignore` para que esto no volviera a pasar.
- En Render el backend me fallaba porque tenía mis modelos como `password.js` (minúscula) pero el código los importaba como `Password.js` (mayúscula). En Windows daba igual, pero Linux (que es donde corre Render) sí distingue, así que aprendí a usar `git mv` para renombrar archivos correctamente.
- En Vercel el `package.json` del frontend se me rompió en algún momento y quedó casi vacío (solo 109 bytes). Por suerte, Git guardaba commits anteriores y pude recuperar la versión buena con `git show HEAD~3:KRIPASS/package.json`.
- Al copiar ese archivo con PowerShell (`>`) se guardó en UTF-16 y npm no podía leerlo. Tuve que cambiar la codificación a UTF-8 manualmente desde VSCode.
- Y luego los típicos líos de CORS entre Vercel y Render: tuve que añadir la variable `FRONTEND_URL` en Render para que permitiera las peticiones del frontend desplegado.

## Cómo usé la IA

Durante el desarrollo me apoyé bastante en IA, sobre todo para la parte del despliegue, que era donde menos experiencia tenía. Le iba pegando los mensajes de error que me salían y me explicaba qué significaban y cómo resolverlos paso a paso. Me sirvió mucho porque muchos errores (como el de las mayúsculas en Linux, o el tema de UTF-16 en PowerShell) nunca los habría resuelto sola solo con la documentación, porque ni sabía que existían esos problemas.

También la usé para entender conceptos nuevos como cómo funcionaba Mongoose, o cómo configurar correctamente CORS para que aceptara tanto `localhost:5173` como mi dominio de Vercel.

Intenté no copiar código sin entenderlo. Cuando la IA me daba una solución, la leía y le preguntaba por qué funcionaba de esa forma. Algunas veces me daba algo que no se ajustaba a mi estructura (por ejemplo, asumía rutas distintas a las mías) y tenía que adaptarlo yo misma. Creo que esa fue la forma en la que más aprendí: no solo copiar, sino entender qué hace cada línea.

## Cosas que mejoraría

- **Planificar mejor antes de empezar a programar.** Al principio empecé sin una arquitectura clara y tuve que rehacer cosas a mitad de camino (por ejemplo, las carpetas se rompían al borrar todas sus contraseñas porque no eran entidades independientes en la BD, lo arreglé después).
- **Hacer commits más pequeños y frecuentes.** Me pasó que hice un commit enorme con muchos cambios a la vez y cuando algo falló, costó más identificar qué lo rompió.
- **Configurar un login con tokens (JWT)** en vez de guardar solo el nombre de usuario en localStorage. Para un proyecto pequeño sirve, pero para uno real no es seguro.
- **Añadir tests automáticos**, aunque fueran básicos. Probé todo manualmente pero sería más profesional tener tests.
