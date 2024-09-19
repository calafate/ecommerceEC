import { object, ref, string } from 'yup'

export const registerSchema = object({
    email: string()
        .required("Ingrese email")
        .email("Formato de email incorrecto"),
    password: string()
        .required("Ingrese Contraseña")
        .min(6, "Minimo 6 caracteres"),
    confirmPassword: string()
        .required("Repita Contraseña")
        .oneOf([ref("password"), null], "Las contraseñas no coinciden"),
})
/*
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,"debe contener may,min y numero"),
*/