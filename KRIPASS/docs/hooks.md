En esta sección se detalla la lógica de estado y las optimizaciones aplicadas mediante Hooks de React para garantizar una aplicación fluida y profesional.

## Custom Hook: `useCredentials`
He desarrollado este Hook personalizado para centralizar la gestión de las contraseñas, logrando separar la inteligencia del negocio de la interfaz visual.

## Hook de Soporte: `useAuth`
Gestiona el estado global del usuario y la seguridad de la sesión.


### Justificación Técnica de los Hooks:

* **`useState` (Gestión de datos dinámicos)**: 
    *En KriPass, los datos son volátiles. Necesitamos que React reaccione instantáneamente a cualquier cambio para que la interfaz nunca se quede desactualizada.
* **`useEffect` (Sincronización con el exterior)**: 
    *La carga de datos es un proceso asíncrono. Lo usamos para garantizar que la conexión con los datos se haga de forma controlada y solo una vez al iniciar, evitando bucles infinitos.
* **`useMemo` (Eficiencia en el filtrado)**: 
    *Filtrar una lista cada vez que el componente se actualiza consume procesador. Con esto, ahorramos batería y recursos del dispositivo, trabajando solo cuando el término de búsqueda cambia.
* **`useCallback` (Estabilidad de funciones)**: 
    *Al pasar funciones de borrado a componentes hijos (como los botones), evitamos re-renders innecesarios al "congelar" la función, logrando que la lista se mueva con total fluidez.
