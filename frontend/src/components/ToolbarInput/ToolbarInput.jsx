import React from "react";


import "./ToolbarInput.css";

export default function ToolbarInput({type,name,placeholder,value,handleChange,error}){

    let className = error ? "inputText" : "inputText";

    return(

        <div className="input-container">
            <input
                className={className}
                type = {type}
                name = {name}
                value = {value}
                id = {name}
                onChange={handleChange}
                required
            />

            <span className="spanInputText">{placeholder}</span>
            {error &&
                <div className="invalid-feedback">
                    {error.message}
                </div>
            }



        </div>

    )
}