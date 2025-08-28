# 📌 Página Web - Proyecto Desarrollo Web

Este proyecto está siendo desarrollado por **Johan Camilo Balanta Santacruz** como propuesta de la clase de **Desarrollo Web**.  
En esta primera etapa se incluyen funcionalidades básicas como:

- Login (con `localStorage`)
- Navbar
- Cards
- To-Do List
- Página de contacto
- Tema claro / oscuro

📦 **Entregable:** Repositorio en GitHub.

---

## 🚀 Funcionalidades

### 🔑 Autenticación
- La aplicación permite ingresar como **Administrador** o como **Usuario**.
- El rol determina los permisos y la información que se muestra.

---

### ✅ To-Do List
1. **Filtros de tareas**
   - Mostrar: **Todos | Pendientes | Completados**.
   - El filtro se mantiene al agregar nuevas tareas (no se “resetea”).
   - El estado del filtro persiste por usuario (almacenado en `localStorage` como `todoFilter_{usuario}`).

2. **Edición de tareas**
   - Permite editar el texto de una tarea existente (doble click sobre el texto o botón *Editar*).
   - El cambio se guarda de manera **inmutable** y persiste en `localStorage`.
   - Se puede cancelar con `Esc` o confirmar con `Enter` / botón *Guardar*.
   - Solo el **Admin** puede borrar tareas de los usuarios.

---

### 📊 Dashboard del Administrador
- Si el usuario logueado es **admin**, se muestra un **Dashboard** con:
  - Saludo dinámico según la hora del día:  
    _“Buenos días/tardes/noches, {usuario}”_.
  - Número total de tareas pendientes de todos los usuarios.
  - Número total de tareas (pendientes + completadas).
- Si el usuario **no es admin**, el Dashboard muestra solo sus métricas personales:
  - Cuántas tareas agregó.
  - Cuántas completó.

**Criterios de aceptación:**
- Si inicia sesión como admin → ve estadísticas globales.
- Si inicia sesión como usuario normal → ve solo su lista personal.
- El saludo cambia correctamente por hora según el computador.

---

### Estilos y UX
- Estilos básicos para modo **claro** y **oscuro** (Incompleto debido a la cantidad de modulos del proyecto y dificultades adicionales)
- Botones e inputs con **`aria-label`** (mejora de accesibilidad).
- Estados vacíos visibles (ej. “No hay tareas para este filtro”).

---

## Tecnologías utilizadas
- **React.js** con Hooks (`useState`, `useEffect`)
- **CSS** (tema claro / oscuro)
- **LocalStorage** para persistencia de datos

---

react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
