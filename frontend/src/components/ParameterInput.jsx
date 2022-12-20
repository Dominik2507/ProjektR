import React, {useState} from "react";
import Input from "./Form/Input";
import Button from "./Form/Button";
import {nanoid} from "nanoid";

export default function ParameterInput({setAllParameters}){
    const [err, setErr] = useState(null);

    const [paramName, setParamName] = useState("");
    const [paramDesc, setParamDesc] = useState("");
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

        let obj = [{
            id: nanoid(),
            paramName,
            paramDesc,
            minValue,
            maxValue
        }];

        setAllParameters(prevAllParameters => [...prevAllParameters, obj]);
        setParamName("");
        setMaxValue("");
        setMinValue("");
        setParamDesc("");
    }
    return(
        <React.Fragment>

                <Input
                    type="text"
                    name="paramName"
                    handleChange={(e) => setParamName(e.target.value)}
                    value={paramName}
                    placeholder="Parameter name"
                    error={err}
                />
            <Input
                type="text"
                name="paramDesc"
                handleChange={(e) => setParamDesc(e.target.value)}
                value={paramDesc}
                placeholder="Parameter description"
                error={null}
            />

            <Input
                type="text"
                name="paramMin"
                handleChange={(e) => setMinValue(e.target.value)}
                value={minValue}
                placeholder="Min value"
                error={null}
            />

            <Input
                type="text"
                name="paramMax"
                handleChange={(e) => setMaxValue(e.target.value)}
                value={maxValue}
                placeholder="Max value"
                error={null}
            />


            <Button placeholder="Add parameter" handleClick={handleSave} />
        </React.Fragment>

    )
}