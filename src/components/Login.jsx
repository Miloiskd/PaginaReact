import { useState } from "react";
import "../styles/Login.css";

export default function Login({ onLogin }) {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [registrando, setRegistrando] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        const usuarioLimpio = usuario.trim().toLowerCase();

        if (registrando) {
            if (usuarios.some(u => u.usuario.toLowerCase() === usuarioLimpio)) {
                setMensaje("⚠️ Ese usuario ya está registrado.");
                return;
            }
            usuarios.push({ usuario: usuarioLimpio, clave });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            setMensaje("Usuario registrado. Ya puede iniciar sesión.");
            setRegistrando(false);
            setClave("");
            return;
        }

        const datos = usuarios.find(u => 
            u.usuario.toLowerCase() === usuarioLimpio && u.clave === clave
        );
        
        if (datos) {
            try {
                localStorage.setItem("sesion", "activa");
                localStorage.setItem("usuario", JSON.stringify(datos));
                setMensaje(`🎉 Bienvenido, ${usuarioLimpio}!`);
                onLogin?.(datos);
            } catch (error) {
                console.error("Error al guardar sesión:", error);
                setMensaje("Error al iniciar sesión");
            }
        } else {
            setMensaje("Usuario o contraseña incorrecta");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">{registrando ? "Registro" : "Iniciar Sesión"}</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-primary">
                        {registrando ? "Registrar" : "Ingresar"}
                    </button>
                </form>

                <button
                    className="btn-secondary"
                    onClick={() => {
                        setRegistrando(!registrando);
                        setMensaje("");
                    }}
                >
                    {registrando ? "Ya tengo cuenta" : "Crear nueva cuenta"}
                </button>

                {mensaje && <p className="login-message">{mensaje}</p>}
            </div>
        </div>
    );
}
