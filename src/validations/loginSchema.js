import { object, string } from 'yup'

export const loginSchema = object({
    password: string()
        .required("Ingrese Contraseña")
        .min(6, "Minimo 6 caracteres"),

    email: string()
        .required("Ingrese email")
        .email("Formato de email incorrecto"),

})

/*
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,"debe contener may,min y numero"),
*/