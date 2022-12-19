import * as React from "react";
import { signinSchema } from "../helpers/signin-validation";
import { Formik, Form, FormikHelpers } from "formik";
import { FormikInput } from "./formik-input";
import { Button } from "@chakra-ui/react";
import { green} from "../helpers/constants";
import { Link } from "react-router-dom";
import { getPasswordHash, AuthAPIResponse, decodeAndSaveToken } from "../helpers/auth-helpers";
import { authContext, AuthData } from "../helpers/context";
import { useToast } from "@chakra-ui/react";
import { postToAPI } from "../helpers/api-helpers";

type SigninFormData = {
    email: string,
    password: string
}

export const Signin: React.FC = () => {

    const authData = React.useContext<AuthData>(authContext);
    const toast = useToast();
    
    const getSigninAPIData = async (formData: SigninFormData) => {
        const passwordHash = await getPasswordHash(formData.password);
        const signinData = {
            email: formData.email,
            passwordHash: passwordHash
        }
        return signinData;
    }

    const submitSigninForm = async (formData: SigninFormData) => {
        const signinAPIData = await getSigninAPIData(formData);
        const response = await postToAPI<AuthAPIResponse>("/auth/login", signinAPIData, toast);
        if(response){
            return response;
        }
        return { result: "Unable to reach"};
    }

    const signinHandler = (formData: SigninFormData, formHelpers: FormikHelpers<SigninFormData>) => {
        submitSigninForm(formData)
        .then((response) => {
            if(response.result === "Unable to reach"){
                return;
            }
            else if(response.result === "User Not Found"){
                formHelpers.setFieldError("email", "A user with this email does not exist.");
                return;
            }
            else if(response.result === "Incorrect password"){
                formHelpers.setFieldError("password", "Your password is incorrect.");
                return;
            }

            if(!response.email || !response.username || !response.profileImage || !response.token){
                return;
            }
            decodeAndSaveToken(response.token);
            authData.token = response.token;
            authData.email = response.email;
            authData.username = response.username;
            authData.profileImage = response.profileImage;
        })
    }

    

    return (
        <>
            <h2 className="text-3xl font-medium text-center" style={{ color: green[500] }}>Welcome Back</h2>
            <p className="text-center" style={{ color: green[500] }}>Please enter in your details below.</p>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={signinSchema}
                validateOnBlur
                onSubmit={(values, formikBag) => signinHandler(values, formikBag)}
            >
                {(props) => (
                    <Form className="flex flex-col items-center my-3">
                        <span className="w-3/5 mb-3">
                            <FormikInput className="bg-white" name="email" label="Email" focusBorderColor={green[500]} placeholder="Email" />
                        </span>

                        <span className="w-3/5 mb-3">
                            <FormikInput type="password" className="bg-white" name="password" label="Password" focusBorderColor={green[500]} placeholder="Password" />
                        </span>
                        <Button type="submit" colorScheme="brand" className="mt-2 w-3/5">Sign In</Button>

                        <span className="mt-3">
                            <p className="inline mr-3">Don't have an account yet?</p>
                            <Link to="/signup" className="inline text-dark-green font-bold">Sign up</Link>
                        </span>
                    </Form>)}
            </Formik>
        </>
    )
}
