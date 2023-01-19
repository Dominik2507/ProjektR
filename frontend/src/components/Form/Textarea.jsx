import React from "react";

export default function Textarea({name, value, placeholder,handleChange}){
    return (
        <div className="mb-3 w-100">
            <textarea placeholder={placeholder} required className="form-control" id="textAreaExample1" rows="4" onChange={handleChange} value={value} name={name}></textarea>
        </div>
    )
}