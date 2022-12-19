import React from "react";
import {nanoid} from "nanoid";

export default function Select({options, setSelected}){
    return (
        <select onChange={(e) => setSelected(e.target.value)} className="form-select" aria-label="Default select example">
            <option selected>Select phase</option>
            {options.map(option => <option key={nanoid()} value={option.id}>{option.phaseName}</option>)}
        </select>
    )
}