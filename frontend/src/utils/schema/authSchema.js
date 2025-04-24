import * as yup from "yup";

const loginSchema = yup
  .object()
  .shape({
    email: yup.string().email().required().lowercase(),
    password: yup.string().required(),
  })
  .required();

const registerSchema = yup
  .object()
  .shape({
    nama: yup.string().required(),
    email: yup.string().email().required().lowercase(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    no_hp: yup.string().required(),
    alamat: yup.string().required(),
    rw: yup.number().required(),
    rt: yup.number().required(),
  })
  .required();

export { loginSchema, registerSchema };
