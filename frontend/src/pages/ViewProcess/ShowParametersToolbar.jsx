import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {nanoid} from "nanoid";

export default function ShowParametersToolbar({phase,setParamId,closeToolbar}){
    console.log(phase);
    return(
        <React.Fragment>
            <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                <p className="h5 ">{phase.name}</p>
                <FontAwesomeIcon icon={faXmark} onClick={closeToolbar} style={{cursor:"pointer"}} className="me-3 h5" />
            </div>
            <div className="d-flex flex-column w-100">
                <div className="phase-params w-100">
                    <p className="text-start mt-3 ms-1">Phase parameters</p>
                    <ul className="list-group w-100">
                        {phase.params.map(param => (
                            <li
                                style={{cursor:"pointer"}}
                                className="list-group-item w-100"
                                key={param.parameterid}
                                title="Click to see details"
                                onClick={() => setParamId(param.parameterid)}
                            >
                                {param.name}
                            </li>
                         ))}
                    </ul>
                </div>
                <div className="component-params w-100">
                    {phase?.components?.map(component => (
                        <div key={nanoid()} className="one-component w-100">
                            <p className="text-start mt-3 ms-1">{component.name}</p>
                            <ul className="list-group w-100">
                            {component?.params?.map(param =>
                                <li
                                    style={{cursor:"pointer"}}
                                    className="list-group-item w-100"
                                    key={param.parameterid}
                                    title="Click to see details"
                                    onClick={() => setParamId(param.parameterid)}
                                >
                                    {param.name}
                                </li>
                            )}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </React.Fragment>
    )
}