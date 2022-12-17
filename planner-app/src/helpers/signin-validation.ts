import * as Yup from "yup";

export const signinSchema = Yup.object({
    email: Yup.string()
        .email("Email must be formatted correctly.")
        .required("Email is required."),
    password: Yup.string()
        .required("Password is required.")
});