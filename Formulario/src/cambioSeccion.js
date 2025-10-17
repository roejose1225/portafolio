const linea = document.querySelectorAll(".linea-pasos__paso");
const contSecciones = document.querySelector(".formulario__body");
export const cambio = () => {
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
