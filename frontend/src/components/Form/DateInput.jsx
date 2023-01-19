import React from "react";

import "./Input.css";

export default function DateInput({type,name,placeholder,value,handleChange,error, label}){

    let className = error ? "form-control is-invalid item" : "form-control item"

    return(

            <div className="form-floating d-flex justify-content-center w-100">
                
                     <div className="d-flex"> <span className="p-1 px-2">{label}</span>
                <input
                    className={className}
                    required
                    type = {"datetime-local"}
                    name = {name}
                    value = {value}
                    placeholder={placeholder}
                    id = {name}
                    onChange={handleChange}
                />
                </div>
                

                <label className="label" htmlFor={name}>{placeholder}</label>
                {error &&
                    <div className="invalid-feedback">
                        {error.message}
                    </div>
                }



        </div>
        
    )
}