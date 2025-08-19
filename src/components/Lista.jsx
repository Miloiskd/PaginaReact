import { useEffect, useState, useMemo } from "react";

export default function Lista({ user }) {
    const storageKey = useMemo(
        () => `todos_${user?.usuario || "anon"}`, [user]
    );

    const [items, setItems] = useState([]);
    const [text, setText] = useState("");

    // Cargar tareas
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
        setItems(saved);
    }, [storageKey]);

    // Guardar tareas
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items, storageKey]);

    const addTodo = (e) => {
        e.preventDefault();
        const txt = text.trim();
        if (!txt) return;
        setItems(prev => [
            ...prev,
            { id: crypto.randomUUID(), text: txt, done: false, ts: Date.now() }
        ]);
        setText("");
    };

    const toggleTodo = (id) => {
        setItems(prev => prev.map(it => it.id === id ? { ...it, done: !it.done } : it));
    };

    const removeTodo = (id) => {
        setItems(prev => prev.filter(it => it.id !== id));
    };

    const clearCompleted = () => {
        setItems(prev => prev.filter(it => !it.done));
    };

    const pending = items.filter(it => !it.done).length;

    return (
        <>
            <h2>Lista</h2>
            <form onSubmit={addTodo} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Nueva tarea"
                    aria-label="Nueva tarea"
                />
                <button type="submit">Agregar Tarea</button>
            </form>
            <ul className="listaTarea">
                {items.length === 0 && (
                    <li>No hay tareitas aún</li>
                )}
                {items.map(item => (
                    <li key={item.id} className="itemsMap">
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toggleTodo(item.id)}
                            aria-label={`Marcar "${item.text}"`}
                        />
                        <span className="textCheckbox">{item.text}</span>
                        <button
                            onClick={() => removeTodo(item.id)}
                            aria-label="eliminar"
                        >Eliminar</button>
                    </li>
                ))}
            </ul>
            <div className="pendientes">
                <span>Pendientes: {pending}</span>
                <button onClick={clearCompleted}>Borrar completadas</button>
            </div>
        </>
    );
}



