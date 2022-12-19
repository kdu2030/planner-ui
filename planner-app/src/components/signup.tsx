import * as React from "react";
import { signupSchema } from "../helpers/signup-validation";
import { Formik, Form, FormikHelpers} from "formik";
import { FormikInput } from "./formik-input";
import { Button, useToast } from "@chakra-ui/react";
import { green, localAPIURL } from "../helpers/constants";
import { Link } from "react-router-dom";
import axios from "axios";
import { getPasswordHash, decodeAndSaveToken, AuthAPIResponse } from "../helpers/auth-helpers";
import { authContext, AuthData } from "../helpers/context";
import { postToAPI } from "../helpers/api-helpers";

type SignupFormData = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export const Signup: React.FC = () => {
    const authData = React.useContext<AuthData>(authContext)
    const toast = useToast();

    const getSignupAPIData = async (formData: SignupFormData) => {
        const passwordHash = await getPasswordHash(formData.password);
        const signupAPIData = {
            username: formData.username,
            email: formData.email,
            passwordHash: passwordHash
        };
        return signupAPIData;
    }

    const submitSignupForm = async (formData: SignupFormData) => {
        const signupData = await getSignupAPIData(formData);
        const response = await postToAPI<AuthAPIResponse>("/auth/signup", signupData, toast);
        if(response){
            return response;
        }
        return {result: "Unable to reach"};
    }

    const signupHandler = (formData: SignupFormData, formHelpers: FormikHelpers<SignupFormData> ) => {
        submitSignupForm(formData)
            .then((response: AuthAPIResponse) => {
                if(response.result === "Unable to reach"){
                    return;
                }
                else if(response.result === "User with username exists"){
                    formHelpers.setFieldError("username", "A user with this username already exists.");
                    return;
                }
                else if(response.result === "User with email exists"){
                    formHelpers.setFieldError("email", "A user with this email already exists");
                    return;
                }
                if(!response.username || !response.email || !response.profileImage || !response.token){
                    return;
                }
                decodeAndSaveToken(response.token);
                authData.token = response.token;
                authData.username = response.username;
                authData.email = response.email;
                authData.profileImage = response.profileImage;
            });
    }



    return (
        <>
            <h2 className="text-3xl font-medium text-center" style={{ color: green[500] }}>Create an account</h2>
            <p className="text-center" style={{ color: green[500] }}>Please enter in your details below.</p>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }}
                validationSchema={signupSchema}
                validateOnBlur
                onSubmit={(values, formikBag) => (signupHandler(values, formikBag))}
            >
                {(props) => (
                    <Form className="flex flex-col items-center my-3">
                        <span className="w-3/5 mb-3">
                            <FormikInput className="bg-white" name="username" label="Username" focusBorderColor={green[500]} placeholder="Username" />
                        </span>
                        <span className="w-3/5 mb-3">
                            <FormikInput className="bg-white" name="email" label="Email" focusBorderColor={green[500]} placeholder="Email" />
                        </span>
                        <span className="w-3/5 mb-3">
                            <FormikInput type="password" className="bg-white" name="password" label="Password" focusBorderColor={green[500]} placeholder="Password" />
                        </span>
                        <span className="w-3/5 mb-3">
                            <FormikInput type="password" className="bg-white" name="confirmPassword" label="Confirm Password" focusBorderColor={green[500]} placeholder="Confirm Password" />
                        </span>
                        <Button type="submit" colorScheme="brand" className="mt-2 w-3/5">Create Account</Button>

                        <span className="mt-3">
                            <p className="inline mr-3">Already have an account?</p>
                            <Link to="/signin" className="inline text-dark-green font-bold">Sign in</Link>
                        </span>
                    </Form>)}
            </Formik>
        </>
    )
}
