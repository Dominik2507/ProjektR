import React from "react";
import text from "../../assets/textData/homePage.json"
import "../../App.css"


export default function Paragraph({title, src, number}){
    
    return(
        <div className={`d-flex flex-column text-start w-100 p-3 background-color-${number%2}`}>
            <h4 className=""> {title} </h4>
            <p className="mx-3" style={{fontSize:"1.3em"}}>
                {text[src]}
            </p>
        </div>
    )
}