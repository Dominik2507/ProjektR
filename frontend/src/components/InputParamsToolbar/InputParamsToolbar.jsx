import React, {useEffect, useState} from "react";
import Input from "../../components/Form/Input";
import "./inputParamsToolbar.css"
import ParameterInput from "../ParameterInput/ParameterInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const InputParamsToolbar = ({phaseIndex,setProcess,handleClose}) => {
    const [params, setParams] = useState([]);

    const handleAddParam = (data) => {
        setProcess(prevProcess => {
            let newProcess = {...prevProcess};
            console.log(newProcess.phases[phaseIndex].params)
            newProcess.phases[phaseIndex].params.push(data);
            console.log(newProcess);
            return newProcess;
        });
    }

    return(
       <React.Fragment>
           <div className="d-flex flex-row w-100 align-items-center justify-content-start mt-3 mb-3">
             <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
           </div>
            <ParameterInput setAllParameters={setParams} handleAddParam={handleAddParam}/>
        </React.Fragment>

    )
}

export default InputParamsToolbar