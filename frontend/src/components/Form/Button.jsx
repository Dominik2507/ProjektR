import React from "react";

import "./Button.css"

export default function Button({handleClick, placeholder, width="75"}){
    return(
        <div className={"d-grid col-4 text-center my-2 w-"+width}>
            <button
                className="btn btn-primary"
                type="button"
                onClick={handleClick}
                >{placeholder}</button>
        </div>
    )
}