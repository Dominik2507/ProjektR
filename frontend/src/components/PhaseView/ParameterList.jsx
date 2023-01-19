import React from "react";

import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ParameterList({ values,inputParamVisible,openPhaseModal }){
    const printValues = values.map(value => ({
        id: value.parameterid ? value.parameterid : null,
        paramName: value.name ? value.name : value.paramName,
        minValue: value.min_value ? value.min_value : value.minValue,
        maxValue: value.max_value ? value.max_value : value.maxValue,
    }));
    return (
        <React.Fragment>
        <ul className="list-group list-group-flush text-start">

            {printValues.length > 0 && printValues.map((value,index) => (<li
                key={index}
                className="list-group-item">
                {value.paramName} {value.minValue.length > 0 && value.maxValue.length && `[${value.minValue} - ${value.maxValue}]`}
                    {inputParamVisible && <FontAwesomeIcon icon={faPlusSquare} onClick={() => openPhaseModal(value.id)}/>}
            </li>)
            )}
        </ul>
        </React.Fragment>
    )
}