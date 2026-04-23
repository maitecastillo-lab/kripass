1. Obtener todas las contraseñas
Endpoint: `GET /api/v1/passwords`
Respuesta (200 OK):

[{ "id": 123, "site": "Google", "category": "Social" }]

2. Guardar una nueva contraseñas
Endpoint:** `POST/api/v1/passwords`
Respuesta (201 Created):
{
  "site": "Santander",
  "username": "use1",
  "password": "clave_bancaria",
  "category": "Bancos"
}

3. Eliminar una contraseña:
Endpoint: `DELETE /api/v1/passwords`
Respuesta (200 ok):
{
  "message": "Eliminado con éxito"
}