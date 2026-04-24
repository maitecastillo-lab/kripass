# API — Endpoints

URL base:

**Desarrollo:** `http://localhost:4000/api/v1`  
**Producción:** `https://kripass.onrender.com/api/v1`



 1. Registrar un usuario

**Endpoint:** `POST /register`

Request:
```json
{
  "usuario": "maite",
  "password": "Kripass1"
}
```

Respuesta (201 Created):
```json
{ "message": "Usuario creado con éxito", "usuario": "maite" }
```

Errores posibles: `400` (faltan datos), `409` (usuario ya existe), `500`.

2. Iniciar sesión

**Endpoint:** `POST /login`

Request:
```json
{
  "usuario": "maite",
  "password": "Kripass1"
}
```

Respuesta (200 OK):
```json
{ "message": "Login exitoso", "usuario": "maite" }
```

Errores posibles: `400`, `401` (credenciales incorrectas), `500`.


 3. Obtener todas las contraseñas

**Endpoint:** `GET /passwords`

Respuesta (200 OK):
```json
[
  {
    "id": "66...",
    "site": "Google",
    "username": "maite@gmail.com",
    "password": "claveDesencriptada",
    "category": "Social"
  }
]
```
4. Guardar una nueva contraseña

**Endpoint:** `POST /passwords`

Request:
```json
{
  "site": "Santander",
  "username": "user1",
  "password": "clave_bancaria",
  "category": "Bancos"
}
```

Respuesta (201 Created): devuelve el objeto creado (con la contraseña ya encriptada en la BD).

Errores: `400` (faltan datos), `500`.



 5. Editar una contraseña

**Endpoint:** `PUT /passwords/:id`

Request (solo envías los campos a cambiar):
```json
{
  "password": "NuevaClaveSegura"
}
```

Respuesta (200 OK): devuelve el objeto actualizado.

Errores: `400`, `404` (no existe), `500`.

6. Eliminar una contraseña

**Endpoint:** `DELETE /passwords/:id`

Respuesta (200 OK):
```json
{ "message": "Eliminado con éxito" }
```

Errores: `404` (no existe), `500`.

 7. Listar carpetas

**Endpoint:** `GET /folders`

Respuesta (200 OK):
```json
[
  { "id": "66...", "name": "Bancos", "createdAt": "2026-04-24T..." }
]
```

8. Crear carpeta

**Endpoint:** `POST /folders`

Request:
```json
{ "name": "Redes" }
```

Respuesta (201 Created): devuelve la carpeta creada.

Errores: `400`, `409` (ya existe).


9. Eliminar carpeta

**Endpoint:** `DELETE /folders/:name`

Elimina la carpeta **y todas sus credenciales asociadas**.

Respuesta (200 OK):
```json
{ "message": "Carpeta eliminada" }
```

Errores: `404`.

