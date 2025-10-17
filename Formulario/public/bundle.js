'use strict';

const linea = document.querySelectorAll(".linea-pasos__paso");
const contSecciones = document.querySelector(".formulario__body");
const cambio = () => {
  linea.forEach((linea) => {
    let lineaActiveID = linea.querySelector(".linea-pasos__paso-check--active");
    const secciones = contSecciones.querySelector(
      `.formulario__seccion[data-paso="${linea.dataset.paso}"]`
    );
    let seccionesID = secciones.dataset.paso;
    if (lineaActiveID && linea.dataset.paso === seccionesID) {
      secciones.scrollIntoView({
        inline: "start",
        behavior: "smooth",
      });
    }
  });
};

const formularioContenedor$4 = document.forms["formulario"];
const lineaPasos$2 = document.querySelectorAll(".linea-pasos__paso");

formularioContenedor$4["cantidad"].addEventListener("blur", (e) => {
  validacionBlur(e.target);
});

const cantidad = () => {
  let cantidad = formularioContenedor$4["cantidad"];
  if (validacionSubmitCantidad(cantidad) !== true) {
    return;
  }

  lineaPasos$2.forEach((linea) => {
    let id = linea.dataset.paso;

    if (id === "cantidad") {
      linea
        .querySelector("span")
        .classList.replace(
          "linea-pasos__paso-check--active",
          "linea-pasos__paso-check--checked"
        );
    }
    if (id === "datos") {
      linea
        .querySelector("span")
        .classList.add("linea-pasos__paso-check--active");
    }
  });
  cambio();
};

const formularioContenedor$3 = document.forms["formulario"];
const lineaPasos$1 = document.querySelectorAll(".linea-pasos__paso");

formularioContenedor$3["nombre-receptor"].addEventListener("blur", (e) => {
  validacionBlur(e.target);
});

formularioContenedor$3["correo-receptor"].addEventListener("blur", (e) => {
  validacionBlur(e.target);
});

const datos = () => {
  let nombre = formularioContenedor$3["nombre-receptor"];
  let correo = formularioContenedor$3["correo-receptor"];
  if (validacionSubmitDatos(nombre, correo) !== true) {
    return;
  }
  lineaPasos$1.forEach((linea) => {
    let id = linea.dataset.paso;
    if (id === "datos") {
      linea
        .querySelector("span")
        .classList.replace(
          "linea-pasos__paso-check--active",
          "linea-pasos__paso-check--checked"
        );
    }
    if (id === "metodo") {
      linea
        .querySelector("span")
        .classList.add("linea-pasos__paso-check--active");
    }
  });
  cambio();
};

const error = (leyenda, input) => {
  leyenda.style.display = "block";
  input.classList.add("formulario__input--error");
};

const removeError = (leyenda, input) => {
  leyenda.style.display = "none";
  input.classList.remove("formulario__input--error");
};

const formularioContenedor$2 = document.forms["formulario"];
const lineaPasos = document.querySelectorAll(".linea-pasos__paso");
const formularioParrafos = document.querySelector(".formulario__parrafos");
const botonForm$1 = document.querySelector(".formulario__btn");
const iconoBoton = document.querySelector(
  `.formulario__btn-contenedor-icono[data-icono="siguiente"]`
);
const iconoBoton2 = document.querySelector(
  `.formulario__btn-contenedor-icono[data-icono="banco"]`
);

const datosReferente = {
  cantidad: null,
  nombre: null,
  correo: null,
  metodo: null,
};

formularioContenedor$2.addEventListener("click", (e) => {
  if (e.target.id === "tarjeta") {
    datosReferente.metodo = e.target.value;
  }
  if (e.target.id === "cheques") {
    datosReferente.metodo = e.target.value;
  }
});

const transferencia = () => {
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

const cambioBoton = (boton) => {
  if (boton) {
    botonForm$1.querySelector("span").innerText = "Transferir";
    botonForm$1.classList.add("formulario__btn--disabled");
    setTimeout(() => {
      botonForm$1.classList.remove("formulario__btn--disabled");
    }, 4000);
    iconoBoton.classList.remove("formulario__btn-contenedor-icono--active");
    iconoBoton2.classList.add("formulario__btn-contenedor-icono--active");
  } else {
    botonForm$1.querySelector("span").innerText = "Siguiente";
    iconoBoton2.classList.remove("formulario__btn-contenedor-icono--active");
    iconoBoton.classList.add("formulario__btn-contenedor-icono--active");
  }
};

const cantidadExpresionRegular = /^[\d]+$/;
const nombreExpresionRegular$1 = /^[a-zA-Z]+([ ][a-zA-Z]+)?$/;
const correoExpresionRegular$1 = /^[a-zA-Z]+(\d?)+[@][a-zA-Z]+[.][a-z]+$/;
const formularioContenedor$1 = document.forms["formulario"];
const formLeyenda = document.querySelector(".formulario__leyenda");

const validacionBlur = (e) => {
  if (e.id === "cantidad") {
    if (e.value === "" || !cantidadExpresionRegular.test(e.value)) {
      error(formLeyenda, formularioContenedor$1["cantidad"]);
      return;
    }
    removeError(formLeyenda, formularioContenedor$1["cantidad"]);
    return true;
  }

  if (e.id === "nombre-receptor") {
    if (e.value === "" || !nombreExpresionRegular$1.test(e.value)) {
      error(formLeyenda, formularioContenedor$1["nombre-receptor"]);
      return;
    }
    removeError(formLeyenda, formularioContenedor$1["nombre-receptor"]);
    return true;
  }

  if (e.id === "correo-receptor") {
    if (e.value === "" || !correoExpresionRegular$1.test(e.value)) {
      error(formLeyenda, formularioContenedor$1["correo-receptor"]);
      return;
    }
    removeError(formLeyenda, formularioContenedor$1["correo-receptor"]);
  }
};

const validacionSubmitCantidad = (valor) => {
  //Validacion cantidad
  let validCantidad = true;
  if (valor.id === "cantidad") {
    if (valor.value === "" || !cantidadExpresionRegular.test(valor.value)) {
      error(formLeyenda, formularioContenedor$1["cantidad"]);
      validCantidad = false;
      return;
    }
    removeError(formLeyenda, formularioContenedor$1["cantidad"]);
    datosReferente.cantidad = valor.value;
    return validCantidad;
  }
};

const validacionSubmitDatos = (nombre, correo) => {
  let validNombre = false;
  let validGmail = false;
  if (nombre.id === "nombre-receptor" && nombre.value !== "") {
    if (nombre.value === "" || !nombreExpresionRegular$1.test(nombre.value)) {
      error(formLeyenda, formularioContenedor$1["nombre-receptor"]);
      return;
    }
    removeError(formLeyenda, formularioContenedor$1["nombre-receptor"]);
    validNombre = true;
    datosReferente.nombre = nombre.value;
  }

  if (correo.id === "correo-receptor" && correo.value !== "") {
    if (correo.value === "" || !correoExpresionRegular$1.test(correo.value)) {
      error(formLeyenda, formularioContenedor$1["correo-receptor"]);
      return;
    }
    removeError(formLeyenda, formularioContenedor$1["correo-receptor"]);
    validGmail = true;
    datosReferente.correo = correo.value;
  }
  if (validNombre && validGmail) {
    return true;
  }
};

const botonForm = document.querySelector(".formulario__btn");
formularioContenedor$1.addEventListener("submit", (e) => {
  e.preventDefault();
  cantidad();
  datos();
  transferencia();

  //Cambiar boton de siguiente a transferir
  if (botonForm.innerText === "Transferir") {
    botonForm.addEventListener("click", (e) => {
      setTimeout(() => {
        const alerta = document.querySelector(".alerta");
        formularioContenedor$1.style.display = "none";
        alerta.classList.add("alerta--active");
      }, 4000);
    });
  }
});

document.querySelectorAll(".linea-pasos__paso");
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
//# sourceMappingURL=bundle.js.map
