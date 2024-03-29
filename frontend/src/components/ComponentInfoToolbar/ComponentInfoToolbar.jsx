import React , { useState }from "react";

import "./ComponentInfoToolbar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import ParameterList from "../PhaseView/ParameterList";
import Input from "../Form/Input";
import ToolbarInput from "../ToolbarInput/ToolbarInput";

export default function ComponentInfoToolbar({component, handleClose,indexOfPhaseForComponent, setProcess}){
    const [err, setErr] = useState(null);

    const [paramName, setParamName] = useState("");
    const [unit, setUnit] = useState("");
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    const handleSave = () => {
        setErr(null);

        if(paramName === ""){
            setErr({
                name: "paramName",
                message: "Parameter name is empty"
            });
            return;
        }

        setProcess(prevProcess => {
            let newProcess = {...prevProcess};
            let phase = newProcess.phases[indexOfPhaseForComponent];

            console.log(phase.components);
            let indexOfComponent = phase.components.findIndex(comp => comp.componentid === component.componentid);
            console.log(newProcess.phases[indexOfPhaseForComponent].components[indexOfComponent]);
            newProcess.phases[indexOfPhaseForComponent].components[indexOfComponent].params.push({

                paramName,
                paramDesc: unit,
                maxValue,
                minValue,

            })
            console.log(newProcess);
            return newProcess;
        })


        //setParamName("");
        setMaxValue("");
        setMinValue("");
        setUnit("");
    }


    return(
        <div className="sidebar-container position-absolute top-0 h-100">
            <div className=" h-100 w-100">
                <div className="h-100 w-100">
                    <div className="d-flex flex-column align-items-center  align-items-sm-start h-100 w-100 shadow-lg p-2  bg-body rounded w-100">
                       <div className="d-flex flex-row w-100 ">
                            <FontAwesomeIcon icon={faXmark} className="close-icon"  onClick={handleClose} />
                       </div>
                        <div className="d-flex flex-row align-items-center justify-content-center w-100">
                            <p>Component name: {component.name}</p>
                        </div>
                        {component.params &&
                        <div>
                            <ParameterList values={component.params}/>
                        </div>
                        }
                        <div className="d-flex flex-column justify-content-center w-100 align-items-center py-3 mt-3">
                            <ToolbarInput
                                type="text"
                                name="paramName"
                                handleChange={(e) => setParamName(e.target.value)}
                                value={paramName}
                                placeholder="Parameter name"
                                error={err}
                            />
                            <ToolbarInput
                                type="text"
                                name="paramDesc"
                                handleChange={(e) => setUnit(e.target.value)}
                                value={unit}
                                placeholder="Unit"
                                error={null}
                            />

                            <ToolbarInput
                                type="number"
                                name="paramMin"
                                handleChange={(e) => setMinValue(e.target.value)}
                                value={minValue}
                                placeholder="Min value"
                                error={null}
                            />
                            <ToolbarInput
                                type="number"
                                name="paramMax"
                                handleChange={(e) => setMaxValue(e.target.value)}
                                value={maxValue}
                                placeholder="Max value"
                                error={null}
                            />

                            <button className="btn btn-primary" onClick={handleSave}>Add parameter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}