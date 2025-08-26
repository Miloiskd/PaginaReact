import { useEffect, useState } from "react";

export default function Lista({ user }) {

  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [cargando, setCargando] = useState(false); 

  const storageKey = user?.usuario ? `lista_${user.usuario.toLowerCase().trim()}` : null;

  useEffect(() => {
    if (!storageKey) return;
    setCargando(true);

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTareas(Array.isArray(parsed) ? parsed : []);
      } else {
        setTareas([]);
      }
    } catch (error) {
      setTareas([]);
    } finally {
      setCargando(false);
    }
  }, [storageKey]);

  const agregarTarea = (e) => {
    e.preventDefault();
    const texto = nuevaTarea.trim();
    if (!texto) return;

    const nuevasTareas = [
      ...tareas,
      {
        id: crypto.randomUUID(),
        texto,
        completada: false,
        fecha: new Date().toISOString()
      }
    ];

    setTareas(nuevasTareas);
    setNuevaTarea("");

    localStorage.setItem(storageKey, JSON.stringify(nuevasTareas));
  };

  if (!user?.usuario) {
    return null;
  }

  const toggleTarea = (id) => {
    setTareas(prev => prev.map(tarea => 
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    ));
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter(tarea => tarea.id !== id);
    console.log(nuevasTareas);
    setTareas(nuevasTareas);
    localStorage.setItem(storageKey, JSON.stringify(nuevasTareas))
  };

  const borrarCompletadas = () => {
    const nuevasTareas = tareas.filter(tarea => !tarea.completada);
    setTareas(nuevasTareas);
    localStorage.setItem(storageKey, JSON.stringify(nuevasTareas))
  };

  return (
    <div className="lista-tareas">
      <h2>Lista de tareas de {user.usuario}</h2>
      
      <form onSubmit={agregarTarea} className="form-tarea">
        <input
          type="text"
          value={nuevaTarea}
          onChange={e => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
          className="input-tarea"
        />
        <button type="submit" className="btn-agregar">
          Agregar
        </button>
      </form>

      <ul className="tareas-list">
        {tareas.length === 0 ? (
          <li className="no-tareas">No hay tareas aún</li>
        ) : (
          tareas.map(tarea => (
            <li key={tarea.id} className={`tarea-item ${tarea.completada ? 'completada' : ''}`}>
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => toggleTarea(tarea.id)}
                className="checkbox-tarea"
              />
              <span className="texto-tarea">{tarea.texto}</span>
              <button
                onClick={() => eliminarTarea(tarea.id)}
                className="btn-eliminar"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="controles-lista">
        <span className="contador">
          Pendientes: {tareas.filter(t => !t.completada).length}
        </span>
        <button
          onClick={borrarCompletadas}
          className="btn-limpiar"
          disabled={!tareas.some(t => t.completada)}
        >
          Borrar completadas
        </button>
      </div>
    </div>
  );
}
