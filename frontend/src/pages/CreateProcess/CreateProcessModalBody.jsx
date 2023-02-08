import React from "react";
import DateInput from "../../components/Form/DateInput";
import Input from "../../components/Form/Input";
import Textarea from "../../components/Form/Textarea";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

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
            <Input type="text" placeholder="Process name" name={createProcessInfo[0].name} value={createProcessInfo[0].value} handleChange={handleChange} error={err} />
            <Textarea placeholder="Process description" value={createProcessInfo[1].value} name={createProcessInfo[1].name} handleChange={handleChange}/>
            {dateError &&
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="bi flex-shrink-0 me-2" />
                    <div>
                        {dateError}
                    </div>
                </div>
            }
            <DateInput type="datetime-local" name={createProcessInfo[2].name} value={createProcessInfo[2].value} handleChange={handleChange} label={createProcessInfo[2].label}/>
         </div>
    )
}