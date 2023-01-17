import React from "react";
import {nanoid} from "nanoid";

export default function ParameterList({ values }){
    return (
        <ul className="list-group list-group-flush text-start">
            {values.map(value => <li key={nanoid()} className="list-group-item">{value.paramName}</li>)}
        </ul>
    )
}