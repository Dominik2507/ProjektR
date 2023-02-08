import React from "react";
import DateInput from "../../components/Form/DateInput";
import Input from "../../components/Form/Input";
import Textarea from "../../components/Form/Textarea";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import ToolbarInput from "../../components/ToolbarInput/ToolbarInput";

export default function CreateProcessModalBody({createProcessInfo, setCreateProcessInfo,err, dateError}){

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
            {false && <Input type="text" placeholder="Process name" name={createProcessInfo[0].name} value={createProcessInfo[0].value} handleChange={handleChange} error={err} />}
            {false && <Textarea placeholder="Process description" value={createProcessInfo[1].value} name={createProcessInfo[1].name} handleChange={handleChange}/> }
            {dateError &&
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="bi flex-shrink-0 me-2" />
                    <div>
                        {dateError}
                    </div>
                </div>
            }
            {false && <DateInput type="datetime-local" name={createProcessInfo[2].name} value={createProcessInfo[2].value} handleChange={handleChange} label={createProcessInfo[2].label}/> }
            
            <ToolbarInput type="text" placeholder="Process name" name={createProcessInfo[0].name} value={createProcessInfo[0].value} handleChange={handleChange} error={err}/>
            <ToolbarInput type={"area"} placeholder="Process description" value={createProcessInfo[1].value} name={createProcessInfo[1].name} handleChange={handleChange}/>
            <ToolbarInput type="datetime-local" placeholder="Starts:" name={createProcessInfo[2].name} value={createProcessInfo[2].value} handleChange={handleChange} label={createProcessInfo[2].label}/>
            
         </div>
    )
}