import * as React from "react";
import { Input, InputProps } from "@chakra-ui/react";
import { useField } from "formik";

type FormikInputProps = InputProps & {
    name: string,
    label: string,
    labelClasses?: string,

}

export const FormikInput: React.FC<FormikInputProps> = (props: FormikInputProps) => {
    const [field, meta, helpers] = useField(props.name);

    return (
        <>
            <label htmlFor={props.label} className={props.labelClasses}>{props.label}</label>
            <Input 
                borderColor={meta.touched && meta.error ? "#ef4444" : props.borderColor} 
                textColor={meta.touched && meta.error ? "#ef4444" : "black"}
                onBlur={field.onBlur} 
                onChange={field.onChange}
                {...props}  
            />
            {meta.touched && meta.error && <p className="text-sm text-red-500">{meta.error}</p>}
        </>
    )
}


