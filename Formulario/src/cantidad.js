import { validacionBlur, validacionSubmitCantidad } from "./validacion";
import { cambio, saltoPaso } from "./cambioSeccion";
const formularioContenedor = document.forms["formulario"];
const lineaPasos = document.querySelectorAll(".linea-pasos__paso");

formularioContenedor["cantidad"].addEventListener("blur", (e) => {
  validacionBlur(e.target);
});

export const cantidad = () => {
  let cantidad = formularioContenedor["cantidad"];
  if (validacionSubmitCantidad(cantidad) !== true) {
    return;
  }

  lineaPasos.forEach((linea) => {
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
