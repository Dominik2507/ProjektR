import React from "react";
import Input from "./Input";
import Button from "./Button";

export default function Form({inputs,handleClick, handleChange ,btnPlaceholder,errors}){
    return(
        <form>
            {inputs.map(input => {

                let err = errors.find(err => input.name === err.name);

                return <Input
                    key={input.name}
                    placeholder={input.placeholder}
                    value={input.value}
                    name={input.name}
                    type={input.type}
                    handleChange={handleChange}
                    error = {err}
                />
            })}

            <Button
                handleClick={handleClick}
                placeholder={btnPlaceholder}
            />

        </form>
    )
}