import React from "react";
import { useForm } from "react-hook-form";
import "../styles/Formulario.css";

export default function Formulario({ onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
    localStorage.setItem("formDato", JSON.stringify(data));

    alert("Formulario enviado");

  };

  return (
    <form className="formulario-container" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre:</label>
        <input {...register("nombre", { required: true })} />
        {errors.nombre && <span>Este campo es obligatorio</span>}
      </div>

      <div>
        <label>Email:</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <span>Introduce un email válido</span>}
      </div>

      <div>
        <label>Mensaje:</label>
        <textarea {...register("mensaje", { required: true })}></textarea>
        {errors.mensaje && <span>Este campo es obligatorio</span>}
      </div>

      <div className="form-buttons">
        <button type="submit">Enviar</button>
        <button type="button" onClick={onClose} className="btn-cerrar">
          Salir
        </button>
      </div>
    </form>
  );
}
