En KriPass, los formularios se gestionan mediante **Componentes Controlados**.

### Gestión del Estado
Utilizamos el hook `useState` para sincronizar el valor de los inputs con el estado de React. Esto permite tener una "fuente única de verdad" y manipular los datos en tiempo real.

### Validaciones Implementadas:
Para mejorar la seguridad del gestor de contraseñas, se ha implementado una validación mediante Expresiones Regulares que exige:
- **Longitud mínima**: 6 caracteres.
- **Complejidad**: Al menos una letra mayúscula y al menos un número.
- **Feedback**: El formulario no permite el envío y muestra un mensaje de error específico si no se cumplen estos requisitos de seguridad.