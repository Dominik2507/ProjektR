import React from "react";
import Input from "../../components/Form/Input";
import Textarea from "../../components/Form/Textarea";

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
        <div className="modal-body">
            <Input type="text" placeholder="Process name" name={createProcessInfo[0].name} value={createProcessInfo[0].value} handleChange={handleChange} error={err} />
            <Textarea placeholder="Process description" value={createProcessInfo[1].value} name={createProcessInfo[1].name} handleChange={handleChange}/>
         </div>
    )
}