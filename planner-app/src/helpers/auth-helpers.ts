import { AuthData } from "../helpers/context";
import jwtDecode from "jwt-decode";


export type TokenData = {
    hash: string;
    expirationDate: Date;
}

export type Token = {
    aud: string;
    exp: number;
    iss: string;
}

export const getPasswordHash = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    let hashArray = Array.from(new Uint8Array(hash));
    const hashStringArray = hashArray.map((byte) => (
        //Turns each hex digit into a character string
        byte.toString(16).padStart(2)
    ));
    return hashStringArray.join("")
}

export const decodeAndSaveToken = (tokenStr: string) => {
    const token = jwtDecode<Token>(tokenStr);
    const tokenData = {
        hash: token,
        expirationDate: new Date(token.exp * 1000)
    }
    localStorage.setItem("token", JSON.stringify(token));
}


