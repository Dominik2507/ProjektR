import React from "react";

import "./Button.css"

export default function Button({handleClick, placeholder}){
    return(
        <div className="d-grid col-4 text-center">
            <button
                className="btn btn-primary"
                type="button"
                onClick={handleClick}
                >{placeholder}</button>
        </div>
    )
}