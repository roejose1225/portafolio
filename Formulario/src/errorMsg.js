export const error = (leyenda, input) => {
  leyenda.style.display = "block";
  input.classList.add("formulario__input--error");
};

export const removeError = (leyenda, input) => {
  leyenda.style.display = "none";
  input.classList.remove("formulario__input--error");
};
