import React, {useState} from "react";
import Input from "./Form/Input";
import Button from "./Form/Button";
import {nanoid} from "nanoid";

export default function ParameterInput({parameterInfo, setParameterInfo, setAllParameters}){
    const [err, setErr] = useState(null);

    const handleChange = (e) => {

        const {value, name} = e.target;

        setParameterInfo(prevParamInfo => {
            let newParamInfo = [...prevParamInfo];
            let index = newParamInfo.findIndex(param => param.name === name);
            newParamInfo[index].value = value;
            return newParamInfo;
        })

    }

    const handleSave = () => {
        setErr(null);
        let err = [];
        if(parameterInfo[0].value === ""){
            err.push({
                name: parameterInfo[0].name,
                message: "Input empty"
            });
        }

        if(parameterInfo[1].value === ""){
            err.push({
                name: parameterInfo[1].name,
                message: "Input empty"
            });
        }

        if(err.length > 0){
            setErr(err);
            return;
        }


        let obj = {id: nanoid(), ...parameterInfo};
        setAllParameters(prevAllParameters => [...prevAllParameters, obj]);
        parameterInfo.forEach(param => param.value = "");


    }
    return(
        <React.Fragment>
            {parameterInfo.map((param,index) => (
                <Input
                    key={index}
                    type="text"
                    name={param.name}
                    handleChange={handleChange}
                    value={param.value}
                    placeholder={param.placeholder}
                    error={err ? err.find(err => parameterInfo.name === err.name) : err}
                />
            ))}

            <Button placeholder="Add parameter" handleClick={handleSave} />
        </React.Fragment>

    )
}