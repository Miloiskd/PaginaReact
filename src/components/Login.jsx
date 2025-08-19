import { useState } from "react";
import "../styles/Login.css";

export default function Login({ onLogin }) {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [registrando, setRegistrando] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (registrando) {
            localStorage.setItem("usuario", JSON.stringify({ usuario, clave }));
            setMensaje("Usuario registrado. Ya puede iniciar sesión.");
            setRegistrando(false);
            setClave("");
            return;
        }
        const datos = JSON.parse(localStorage.getItem("usuario") || "null");
        if (datos && datos.usuario === usuario && datos.clave === clave) {
            localStorage.setItem("sesion", "activa");
            setMensaje(`🎉 Bienvenido, ${usuario}!`);
            onLogin?.();
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
