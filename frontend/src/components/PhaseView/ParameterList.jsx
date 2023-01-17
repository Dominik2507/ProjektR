import React from "react";
import {nanoid} from "nanoid";

export default function ParameterList({ values }){
    return (
        <ul className="list-group list-group-flush text-start">
            {values.map(value => <li key={nanoid()} className="list-group-item">{value.paramName} {value.minValue.length > 0 && value.maxValue.length && `[${value.minValue} - ${value.maxValue}]`}</li>)}
        </ul>
    )
}