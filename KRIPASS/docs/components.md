En esta sección se detalla el desarrollo de componentes reutilizables, enfocándose en la modularidad y el tipado fuerte con TypeScript.


# `Button`
Es el elemento de interacción principal, todos los botones de la App vienen del mismo diseño.

**Pasos de desarrollo aplicados**:
* **TypeScript**: He definido la interfaz `ButtonProps` para asegurar que el componente siempre reciba un texto (`label`) y una acción (`onClick`), evitando errores de datos.

* **Tailwind CSS**: Utiliza variantes dinámicas (`primario`, `peligro`, `exito`) que gestionan el color de fondo y los efectos visuales como el *hover* mediante clases de utilidad.

* **Modularidad**: El componente es totalmente independiente, lo que permite usarlo en cualquier parte del proyecto (formularios, tarjetas o ventanas).

# `inputOculto`
Es la caja de texto especial diseñada para manejar información privada como contraseñas o la llave de acceso y se oculte por defecto, pero tambien incluye una opción para que se pueda ver.

**Pasos de desarrollo aplicados**:
    * **React (Estado Interno)**: Utiliza un `useState` llamado `mostrar` que funciona como un interruptor. Si es *true*, el texto se ve; si es *false*, se oculta tras puntos negros.
    * **TypeScript (Props Tipadas)**: He definido la interfaz `InputSeguroProps` para controlar el título (`label`), el valor del texto y la función que lo actualiza.
    * **Composición de Componentes**: Este componente es un ejemplo de composición, ya que dentro de la caja de texto hemos integrado iconos profesionales de la librería **Lucide React** (`Eye` y `EyeOff`).
    * **Tailwind CSS**: 
        * Uso de `relative` y `absolute` para colocar el icono del ojo justo al final de la caja de texto.
        * Bordes redondeados y efectos de brillo (`focus:ring`) para que el usuario sepa que está escribiendo ahí.

# `credentialCards`
Es donde se muestran las cuentas guardadas del usuario.

**Pasos de desarrollo aplicados**:
* **Composición de Componentes**: Es el ejemplo principal de composición en KriPass, ya que integra dos componentes `Button` (Copiar y Borrar) dentro de su propia estructura.

* **TypeScript**: Utiliza la interfaz `CredentialProps` para asegurar que cada tarjeta reciba siempre un sitio, un usuario y una categoría, evitando campos vacíos.

* **Tailwind CSS**: 
    * Usa un diseño de `flexbox` para alinear la información a la izquierda y los botones a la derecha de forma equilibrada.
    * Aplica efectos de `hover` para resaltar la tarjeta cuando el usuario pasa el ratón, mejorando la navegación 

# `SearchBar` 
Es el encargado de filtrar la lista de credenciales. 

**Pasos de desarrollo aplicados**:
* **TypeScript**: Utiliza `SearchProps` para manejar el estado del texto de búsqueda de forma sincronizada con el panel de contenido.
* **Tailwind CSS**: 
    * Usa un diseño minimalista con `bg-slate-100` que cambia a blanco al hacer foco, dando una sensación de interactividad.
    * Posicionamiento del icono de búsqueda mediante `absolute` para que no estorbe al escribir.

# `SecurityPas`
Analiza y muestra la seguridad de la contraseña en tiempo real.

**Pasos de desarrollo aplicados**:

* **TypeScript**: Utiliza la interfaz `SecurityProps` para asegurar que el nivel de seguridad sea siempre un número controlado entre 0 y 4.
* **Tailwind CSS**: 
    * La barra utiliza `transition-all` para que el cambio de tamaño sea fluido y no de golpe.
    * Los colores cambian dinámicamente para dar un aviso visual rápido (Rojo = Peligro, Verde = Seguro).

