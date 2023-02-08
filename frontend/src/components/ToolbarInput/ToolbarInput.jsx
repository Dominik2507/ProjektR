import React from "react";


import "./ToolbarInput.css";

export default function ToolbarInput({type,name,placeholder,value,handleChange,error}){

    let className = error ? "inputText" : "inputText";

    if(type==="area"){
        return(

        <div className="input-container">
            <textarea
                className={className}
                type = {type}
                name = {name}
                value = {value}
                id = {name}
                onChange={handleChange}
                required
                rows={5}
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