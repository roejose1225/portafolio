import { validacionBlur, validacionSubmitDatos } from "./validacion";
import { cambio, saltoPaso } from "./cambioSeccion";
const formularioContenedor = document.forms["formulario"];
const lineaPasos = document.querySelectorAll(".linea-pasos__paso");

formularioContenedor["nombre-receptor"].addEventListener("blur", (e) => {
  validacionBlur(e.target);
});

formularioContenedor["correo-receptor"].addEventListener("blur", (e) => {
  validacionBlur(e.target);
});

export const datos = () => {
  let nombre = formularioContenedor["nombre-receptor"];
  let correo = formularioContenedor["correo-receptor"];
  if (validacionSubmitDatos(nombre, correo) !== true) {
    return;
  }
  lineaPasos.forEach((linea) => {
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
