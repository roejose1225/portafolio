import { cambio } from "./cambioSeccion";
import { cambioBoton } from "./transferencia";
const linea = document.querySelectorAll(".linea-pasos__paso");
const nombreExpresionRegular = /^[a-zA-Z]+([ ][a-zA-Z]+)?$/;
const correoExpresionRegular = /^[a-zA-Z]+(\d?)+[@][a-zA-Z]+[.][a-z]+$/;
const formularioContenedor = document.forms["formulario"];
const lineaCont = document.getElementById("linea-pasos");

lineaCont.addEventListener("click", (e) => {
  const nombre = formularioContenedor["nombre-receptor"].value;
  const correo = formularioContenedor["correo-receptor"].value;
  if (
    !nombreExpresionRegular.test(nombre) ||
    !correoExpresionRegular.test(correo)
  ) {
    return;
  }
  const activo = document.querySelector(".linea-pasos__paso-check--active");
  const linea = e.target.closest(".linea-pasos__paso");
  if (linea && linea.querySelector(".linea-pasos__paso-check--checked")) {
    if (activo) {
      activo.classList.remove("linea-pasos__paso-check--active");
    }

    linea
      .querySelector(".linea-pasos__paso-check--checked")
      .classList.add("linea-pasos__paso-check--active");
    cambio();
    cambioBoton(false);
  }
});

/*
if (e.target.closest(".linea-pasos__paso-check--checked")) {
    if (activo) {
      activo.classList.remove("linea-pasos__paso-check--active");
    }
    e.target.classList.add("linea-pasos__paso-check--active");
    cambio();
    boton = false;
    cambioBoton(boton);
  }
 */
