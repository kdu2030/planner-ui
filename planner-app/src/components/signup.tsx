import * as React from "react";
import { signupSchema } from "../helpers/signup-validation";
import { Formik, Form } from "formik";
import { FormikInput } from "./formik-input";
import { Button } from "@chakra-ui/react";
import { green } from "../helpers/theme";
import { Link } from "react-router-dom";

export const Signup: React.FC = () => {

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
                onSubmit={() => console.log("Hello")}
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
