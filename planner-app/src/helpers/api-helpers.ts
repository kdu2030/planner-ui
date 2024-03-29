import { Type } from "typescript";
import { localAPIURL } from "./constants";
import axios from "axios";

export const postToAPI = async <Type>(url: string, data: object, toast: Function) => {
    try{ 
        const response = await axios.post<Type>(localAPIURL + url, data);
        return response.data;
    }
    catch{
        toast({
                title: "We had trouble reaching Planner App. Please try again later.",
                status: "error",
                isClosable: true
        });
        return null;
    }
}