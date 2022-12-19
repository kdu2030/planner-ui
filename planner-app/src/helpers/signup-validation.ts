import * as Yup from "yup";

export const signupSchema = Yup.object({
    username: Yup.string()
        .required("Username is required."),
    email: Yup.string()
        .email("Email must be formatted correctly.")
        .required("Email is required."),
    password: Yup.string()
        .required("Password is required."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match.")
        .required("Please type your password again.")
});