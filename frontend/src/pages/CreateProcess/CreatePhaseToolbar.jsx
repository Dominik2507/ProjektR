import React, {useState} from "react";
import CreatePhase from "./CreatePhase";
import CreateComponent from "./CreateComponent";
import Dropdown from "../../components/Dropdown";
import {paramInputs} from "../../constants/paramInputs";

export default function CreatePhaseToolbar({processId}){

    const [phases, setPhases] = useState([]);
    const [component, setComponent] = useState([]);
    const [phaseParameterInfo, setPhaseParameterInfo] = useState([{
        name: "parameterName",
        value: "",
        placeholder: "Parameter name",
    },{
        name: "unit",
        value: "",
        placeholder: "Unit",
    },{
        name: "minimumValue",
        value: "",
        placeholder: "Minimum value",
    },{
        name: "maxValue",
        value: "",
        placeholder: "Maximum value",
    }]);
    const [componentParameterInfo, setComponentParameterInfo] = useState([{
        name: "parameterName",
        value: "",
        placeholder: "Parameter name",
    },{
        name: "unit",
        value: "",
        placeholder: "Unit",
    },{
        name: "minimumValue",
        value: "",
        placeholder: "Minimum value",
    },{
        name: "maxValue",
        value: "",
        placeholder: "Maximum value",
    }]);

    return(
        <React.Fragment>
            <Dropdown name="Phase">
                <CreatePhase processId={processId} setPhases={setPhases} parameterInfo={phaseParameterInfo} setParameterInfo={setPhaseParameterInfo} />
            </Dropdown>
            {
                phases &&
                <Dropdown name="Component">
                    <CreateComponent setComponent = {setComponent} phases={phases} parameterInfo={componentParameterInfo} setParameterInfo={setComponentParameterInfo} />
                </Dropdown>
            }
        </React.Fragment>
    )
}