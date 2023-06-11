import React from "react";
import DateInput from "../../components/Form/DateInput";
import Input from "../../components/Form/Input";
import Textarea from "../../components/Form/Textarea";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import ToolbarInput from "../../components/ToolbarInput/ToolbarInput";

export default function CreateProcessModalBody({createProcessInfo, setCreateProcessInfo,err}){

    const handleChange = (e) => {
        const {name, value} = e.target;

        setCreateProcessInfo(prevProcessInfo => {
            let newCreateProcessInfo = [...prevProcessInfo];
            let index = newCreateProcessInfo.findIndex(processInfo => processInfo.name === name);
            newCreateProcessInfo[index].value = value;
            return newCreateProcessInfo;
        })
    }

    return (
        <div className="modal-body d-flex flex-column align-items-start">
            
            <ToolbarInput type="text" placeholder="Process name" name={createProcessInfo[0].name} value={createProcessInfo[0].value} handleChange={handleChange} error={err}/>
            <ToolbarInput type={"area"} placeholder="Process description" value={createProcessInfo[1].value} name={createProcessInfo[1].name} handleChange={handleChange}/>
            
         </div>
    )
}