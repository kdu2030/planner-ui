import * as React from "react";
import logo from "../static/logo.png";
import notepad from "../static/notepad.jpg";
import { green } from "../helpers/theme";

type AuthenticationProps = {
    children: React.ReactNode
}

export const Authentication: React.FC<AuthenticationProps> = ({children}: AuthenticationProps) => {

    return (
        <>
            <div className="float-left flex flex-col w-2/5 min-h-screen h-full" style={{ backgroundColor: green[50] }} >
                <img className="ml-5 my-5" src={logo} alt="planner app logo" width="150px" />
                <div className="flex flex-col grow justify-center">
                    { children }
                </div>
            </div>
            <div className="float-right w-3/5 min-h-screen h-full" style={{ backgroundImage: `url(${notepad})`, backgroundPosition: "center" }}>
            </div>
        </>
    )
}
