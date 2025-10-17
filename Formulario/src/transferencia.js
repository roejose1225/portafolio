import { cambio } from "./cambioSeccion";
const formularioContenedor = document.forms["formulario"];
const lineaPasos = document.querySelectorAll(".linea-pasos__paso");
const formularioParrafos = document.querySelector(".formulario__parrafos");
const botonForm = document.querySelector(".formulario__btn");
const iconoBoton = document.querySelector(
  `.formulario__btn-contenedor-icono[data-icono="siguiente"]`
);
const iconoBoton2 = document.querySelector(
  `.formulario__btn-contenedor-icono[data-icono="banco"]`
);

export const datosReferente = {
  cantidad: null,
  nombre: null,
  correo: null,
  metodo: null,
};

formularioContenedor.addEventListener("click", (e) => {
  if (e.target.id === "tarjeta") {
    datosReferente.metodo = e.target.value;
  }
  if (e.target.id === "cheques") {
    datosReferente.metodo = e.target.value;
  }
});

export const transferencia = () => {
  if (datosReferente.metodo !== null) {
    const plantillaParrafos = `
  <p data-valor="cantidad"><b>Cantidad:</b> ${datosReferente.cantidad}<span></span></p>
	<p data-valor="nombre-receptor"><b>Receptor:</b> ${datosReferente.nombre} <span></span></p>
	<p data-valor="correo-receptor"><b>Correo del receptor:</b> ${datosReferente.correo} <span></span></p>
	<p data-valor="metodo"><b>Método de pago:</b> ${datosReferente.metodo} <span></span></p>
   `;
    formularioParrafos.innerHTML = plantillaParrafos;

    lineaPasos.forEach((linea) => {
      let lineaPasoID = linea.dataset.paso;
      if (lineaPasoID === "metodo") {
        linea
          .querySelector("span")
          .classList.replace(
            "linea-pasos__paso-check--active",
            "linea-pasos__paso-check--checked"
          );
      }
      if (lineaPasoID === "confirmacion") {
        linea
          .querySelector("span")
          .classList.add("linea-pasos__paso-check--active");
      }
      let boton = false;
      if (
        linea.querySelector(".linea-pasos__paso-check--active") &&
        linea.dataset.paso === "confirmacion"
      ) {
        boton = true;
      }
      cambioBoton(boton);
      cambio();
    });
    return;
  }
};

export const cambioBoton = (boton) => {
  if (boton) {
    botonForm.querySelector("span").innerText = "Transferir";
    botonForm.classList.add("formulario__btn--disabled");
    setTimeout(() => {
      botonForm.classList.remove("formulario__btn--disabled");
    }, 4000);
    iconoBoton.classList.remove("formulario__btn-contenedor-icono--active");
    iconoBoton2.classList.add("formulario__btn-contenedor-icono--active");
  } else {
    botonForm.querySelector("span").innerText = "Siguiente";
    iconoBoton2.classList.remove("formulario__btn-contenedor-icono--active");
    iconoBoton.classList.add("formulario__btn-contenedor-icono--active");
  }
};
