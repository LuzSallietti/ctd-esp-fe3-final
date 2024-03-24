import * as yup from "yup";

export const schema = yup.object().shape({
  customer: yup.object().shape({
    name: yup.string().required("Este campo es requerido").min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres"),
    lastname: yup.string().required("Este campo es requerido").min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres"),
    email: yup.string().email("Correo inválido").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido").required("Este campo es requerido"),
    address: yup.object().shape({
      address1: yup.string().required("Este campo es requerido").min(7, "Mínimo 7 caracteres"),
      address2: yup.string(),
      city: yup.string().required("Este campo es requerido").min(3, "Mínimo 3 caracteres"),
      state: yup.string().required("Este campo es requerido").min(3, "Mínimo 7 caracteres"),
      zipCode: yup.string().required("Este campo es requerido"),
    }),
  }),
  card: yup.object().shape({
    cardNumber: yup.string().required("Este campo es requerido").length(16, "Debe tener exactamente 16 números"),
    cvc: yup.string().required("Este campo es requerido").length(3, "Debe indicar 3 dígitos"),
    expDate: yup.string().required("Este campo es requerido").length(4, "Debe tener 2 digitos para mes y 2 para el año"),
    cardName: yup.string().required("Este campo es requerido"),
  }),
});