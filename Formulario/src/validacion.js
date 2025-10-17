import { cantidad } from "./cantidad";
import { datos } from "./datos";
import { error, removeError } from "./errorMsg";
import { datosReferente, transferencia } from "./transferencia";
const cantidadExpresionRegular = /^[\d]+$/;
const nombreExpresionRegular = /^[a-zA-Z]+([ ][a-zA-Z]+)?$/;
const correoExpresionRegular = /^[a-zA-Z]+(\d?)+[@][a-zA-Z]+[.][a-z]+$/;
const formularioContenedor = document.forms["formulario"];
const formLeyenda = document.querySelector(".formulario__leyenda");

export const validacionBlur = (e) => {
  if (e.id === "cantidad") {
    if (e.value === "" || !cantidadExpresionRegular.test(e.value)) {
      error(formLeyenda, formularioContenedor["cantidad"]);
      return;
    }
    removeError(formLeyenda, formularioContenedor["cantidad"]);
    return true;
  }

  if (e.id === "nombre-receptor") {
    if (e.value === "" || !nombreExpresionRegular.test(e.value)) {
      error(formLeyenda, formularioContenedor["nombre-receptor"]);
      return;
    }
    removeError(formLeyenda, formularioContenedor["nombre-receptor"]);
    return true;
  }

  if (e.id === "correo-receptor") {
    if (e.value === "" || !correoExpresionRegular.test(e.value)) {
      error(formLeyenda, formularioContenedor["correo-receptor"]);
      return;
    }
    removeError(formLeyenda, formularioContenedor["correo-receptor"]);
  }
};

export const validacionSubmitCantidad = (valor) => {
  //Validacion cantidad
  let validCantidad = true;
  if (valor.id === "cantidad") {
    if (valor.value === "" || !cantidadExpresionRegular.test(valor.value)) {
      error(formLeyenda, formularioContenedor["cantidad"]);
      validCantidad = false;
      return;
    }
    removeError(formLeyenda, formularioContenedor["cantidad"]);
    datosReferente.cantidad = valor.value;
    return validCantidad;
  }
};

export const validacionSubmitDatos = (nombre, correo) => {
  let validNombre = false;
  let validGmail = false;
  if (nombre.id === "nombre-receptor" && nombre.value !== "") {
    if (nombre.value === "" || !nombreExpresionRegular.test(nombre.value)) {
      error(formLeyenda, formularioContenedor["nombre-receptor"]);
      return;
    }
    removeError(formLeyenda, formularioContenedor["nombre-receptor"]);
    validNombre = true;
    datosReferente.nombre = nombre.value;
  }

  if (correo.id === "correo-receptor" && correo.value !== "") {
    if (correo.value === "" || !correoExpresionRegular.test(correo.value)) {
      error(formLeyenda, formularioContenedor["correo-receptor"]);
      return;
    }
    removeError(formLeyenda, formularioContenedor["correo-receptor"]);
    validGmail = true;
    datosReferente.correo = correo.value;
  }
  if (validNombre && validGmail) {
    return true;
  }
};

const botonForm = document.querySelector(".formulario__btn");
formularioContenedor.addEventListener("submit", (e) => {
  e.preventDefault();
  cantidad();
  datos();
  transferencia();

  //Cambiar boton de siguiente a transferir
  if (botonForm.innerText === "Transferir") {
    botonForm.addEventListener("click", (e) => {
      setTimeout(() => {
        const alerta = document.querySelector(".alerta");
        formularioContenedor.style.display = "none";
        alerta.classList.add("alerta--active");
      }, 4000);
    });
  }
});
