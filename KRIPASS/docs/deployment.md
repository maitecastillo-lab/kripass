# Despliegue

## Resumen

KRIPASS está desplegada en tres servicios diferentes, todos gratuitos:

 Parte - Servicio - URL 
| **Frontend:** Vercel - https://kripass.vercel.app 
| **Backend:** Render - https://kripass.onrender.com 
| **Base de datos:**  MongoDB Atlas - (conexión interna) 

Los tres están conectados entre sí mediante variables de entorno.

## Por qué estos servicios

- **Vercel:** ideal para proyectos con Vite + React. Detecta automáticamente la configuración, es rápido y ofrece un dominio `.vercel.app` gratis.
- **Render:** perfecto para Node.js. Plan gratuito sin tarjeta de crédito. Admite variables de entorno y despliegue automático desde GitHub.
- **MongoDB Atlas:** servicio oficial de MongoDB con 500 MB gratis, sin caducidad y sin tarjeta.

## Preparación del código

Antes de desplegar tuve que hacer varios ajustes:

**1. Variables de entorno en el frontend**

Creé un archivo `.env` en la raíz con: VITE_API_URL=http://localhost:4000/api/v1

Y en el código cambié las URLs hardcodeadas `http://localhost:4000/api/v1` por `import.meta.env.VITE_API_URL`. Así cuando despliegue, solo tengo que cambiar esa variable en Vercel y todas las peticiones apuntan al backend de producción.

**2. Variables de entorno en el backend**

Mi `.env` del backend tiene:PORT=4000
CRYPTO_KEY=clave_kripass_seguro_encriptad01
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://kripass.vercel.app

**3. CORS dinámico**

Configuré Express para aceptar peticiones tanto de `localhost:5173` (desarrollo) como del dominio de Vercel (producción):

```js
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
```

**4. Script `start` en el backend**

Render necesita un comando para arrancar. Añadí en `server/package.json`:

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

**5. `.gitignore` estricto**

Me aseguré de que `node_modules/`, `.env`, `db.json` y `users.json` no se suban a GitHub para que las credenciales nunca queden expuestas.

## Proceso de despliegue

### 1. MongoDB Atlas

1. Creé una cuenta en mongodb.com/cloud/atlas.
2. Creé un cluster M0 (gratuito) en la región de París.
3. Creé un usuario de base de datos con permisos de lectura/escritura.
4. En **Network Access** configuré `0.0.0.0/0` (acceso desde cualquier IP) para que Render pueda conectarse.
5. Obtuve la URL de conexión (cadena tipo `mongodb+srv://...`) y la guardé para usarla en Render.

### 2. Backend en Render

1. En Render, creé un nuevo **Web Service** conectado a mi repo de GitHub.
2. Configuré:
   - **Root Directory:** `KRIPASS/server` (porque el backend está dentro de esa subcarpeta).
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
3. Añadí las variables de entorno:
   - `CRYPTO_KEY`
   - `MONGODB_URI`
   - `PORT`
   - `FRONTEND_URL` (se añadió después, tras desplegar Vercel)
4. Render detectó el push de GitHub y empezó a construir. Tardó unos 3 minutos.

### 3. Frontend en Vercel

1. En Vercel, importé el mismo repo de GitHub.
2. Configuré:
   - **Root Directory:** `KRIPASS` (donde está el frontend).
   - **Framework Preset:** Vite.
3. Añadí la variable de entorno:
   - `VITE_API_URL` = `https://kripass.onrender.com/api/v1`
4. Dale a **Deploy** y en 1-2 minutos el frontend estaba online.

## Problemas que encontré (y cómo los resolví)

El despliegue fue sin duda la parte más complicada del proyecto. Algunos problemas que me salieron:

**Commit con `.env` por error**

La primera vez hice `git add .` y el `.env` del backend se iba a subir con la clave de MongoDB dentro. Por suerte, me di cuenta ANTES de hacer `git push`. Deshice el commit con `git reset --soft HEAD~1`, arreglé el `.gitignore` y volví a hacer commit. Crisis evitada.

**Mayúsculas en Linux (Render)**

Mis archivos de modelos estaban como `password.js`, `user.js`, `folder.js`, pero en el código los importaba como `Password`, `User`, `Folder`. En Windows funcionaba porque no distingue mayúsculas, pero en el servidor de Render (Linux) no encontraba los archivos. Tuve que usar `git mv` para renombrarlos con mayúscula y volver a desplegar.

**`package.json` roto**

En algún momento mi `package.json` del frontend se quedó casi vacío (solo 109 bytes, con axios y nada más). Vercel no podía construir porque no tenía Vite instalado. Recuperé el archivo correcto de un commit anterior con:

```bash
git show HEAD~3:KRIPASS/package.json > package.json
```

Pero PowerShell lo guardó en UTF-16, que npm no puede leer. Tuve que cambiar la codificación a UTF-8 desde VSCode.

**Error `erasableSyntaxOnly`**

En `tsconfig.app.json` y `tsconfig.node.json` había una opción de TypeScript muy nueva (`erasableSyntaxOnly`) que Vercel no reconocía. La eliminé y el build pasó sin problemas.

**Backend dormido**

El plan gratuito de Render "duerme" el backend tras 15 min sin uso. La primera petición después de dormirse tarda unos 50 segundos en despertarse. Para la demo o la presentación hay que tenerlo en cuenta y "despertarlo" abriendo la URL antes de enseñar la app.

## Comprobación final

Una vez todo desplegado, verifiqué que pueda:

- Abrir `https://kripass.vercel.app` y ver la pantalla de login.
- Registrarse con un usuario nuevo → el registro se guarda en MongoDB Atlas.
- Iniciar sesión → redirige al dashboard.
- Crear carpetas y credenciales → se guardan en la BD.
- Ver contraseñas con el ojito → se desencriptan correctamente.
- Editar y borrar credenciales.
- Recargar F5 → la sesión se mantiene.

Todo funciona como en local, solo que ahora accesible desde cualquier parte del mundo.