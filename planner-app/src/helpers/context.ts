import * as React from "react";

export type AuthData = {
    token: string,
    username: string,
    email: string,
    profileImage: string
}

const authDefaultContext = {
    token: "",
    username: "",
    email: "",
    profileImage: ""
}

export const authContext = React.createContext<AuthData>(authDefaultContext); 
