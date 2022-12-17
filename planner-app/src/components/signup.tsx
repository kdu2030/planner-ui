import * as React from "react";
import logo from "../static/logo.png";
import notepad from "../static/notepad.jpg";
import { Input, Button } from "@chakra-ui/react";
import { green } from "../helpers/theme";

export const Signup: React.FC = () => {

    return (
        <>
            <div className="float-left w-2/5 h-screen" style={{backgroundColor: green[50]}} >
                <img className="ml-5 my-5" src={logo} alt="planner app logo" width="150px" />
                <div>
                    <h2 className="text-3xl font-medium text-center" style={{color: green[500]}}>Create an account</h2>
                    <p className="text-center" style={{color: green[500]}}>Please enter in your details below.</p>
                    <form className="flex flex-col items-center my-3">
                        <span className="w-3/5 mb-3">
                            <label htmlFor="username" className="text-dark-green">Username</label>
                            <Input focusBorderColor={green[500]} className="block bg-white" type="text" placeholder="Username" style={{backgroundColor: "white"}} />
                        </span>
                        <span className="w-3/5 mb-3">
                            <label htmlFor="email" className="text-dark-green">Email</label>
                            <Input focusBorderColor={green[500]}  className="block bg-white" type="text" placeholder="Email" />
                        </span>
                        <span className="w-3/5 mb-3">
                        <label htmlFor="password" className="text-dark-green">Password</label>
                         <Input focusBorderColor={green[500]}  className="block bg-white" type="password" placeholder="Password" />
                        </span>
                        <span className="w-3/5 mb-3">
                        <label htmlFor="password" className="text-dark-green">Confirm Password</label>
                         <Input focusBorderColor={green[500]} className="block bg-white" type="password" placeholder="Confirm Password" />
                        </span>
                        <Button type="button" colorScheme="brand" className="mt-2 w-3/5">Create Account</Button>
                        
                        <span className="mt-3">
                            <p className="inline mr-3">Already have an account?</p>
                            <a className="inline text-dark-green font-bold">Sign in</a>
                        </span>
                    </form>
                </div>
            </div>
            <div className="float-right w-3/5 h-screen" style={{ backgroundImage: `url(${notepad})`, backgroundPosition: "center" }}>
            </div>
        </>
    )
}
