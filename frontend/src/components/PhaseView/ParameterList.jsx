import React from "react";

export default function ParameterList({ values }){
    return (
        <ul className="list-group list-group-flush">
            {values.map(value => <li className="list-group-item">{value}</li>)}
        </ul>
    )
}