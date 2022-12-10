import React from "react";

import "./Input.css";

export default function Input({type,name,placeholder,value,handleChange,error}){

    let className = error ? "form-control is-invalid item" : "form-control item"

    return(
        <div className = "col-lg-8">

            <div className="form-floating mb-2 input-container">
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

                <label htmlFor={name}>{placeholder}</label>
                {error &&
                    <div className="invalid-feedback">
                        {error.message}
                    </div>
                }
            </div>



        </div>
        
    )
}