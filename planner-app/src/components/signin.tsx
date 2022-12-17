import * as React from "react";
import { signinSchema } from "../helpers/signin-validation";
import { Formik, Form } from "formik";
import { FormikInput } from "./formik-input";
import { Button } from "@chakra-ui/react";
import { green } from "../helpers/theme";
import { Link } from "react-router-dom";

export const Signin: React.FC = () => {

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
                onSubmit={() => console.log("Hello")}
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
