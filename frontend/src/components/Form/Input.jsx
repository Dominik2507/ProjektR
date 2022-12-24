import React from "react";

import "./Input.css";

export default function Input({type,name,placeholder,value,handleChange,error}){

    let className = error ? "form-control is-invalid item" : "form-control item"

    return(

            <div className="form-floating d-flex justify-content-center  w-100">
                <input
                    className={className}
                    type = {type}
                    name = {name}
                    value = {value}
                    placeholder={placeholder}
                    id = {name}
                    onChange={handleChange}
                    required
                />

                <label className="label" htmlFor={name}>{placeholder}</label>
                {error &&
                    <div className="invalid-feedback">
                        {error.message}
                    </div>
                }



        </div>
        
    )
}