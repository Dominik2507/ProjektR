import React, {useState} from "react";
import Input from "../Form/Input";
import Button from "../Form/Button";
import ToolbarInput from "../ToolbarInput/ToolbarInput";

export default function ParameterInput({params,setAllParameters,handleAddParam}){
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

        let obj = {
            paramName,
            paramDesc,
            minValue,
            maxValue
        };

        if(handleAddParam){
           handleAddParam(obj);
           reset();
           return;
        }


        if(params){
            setAllParameters([...params, obj]);
        }else{
            setAllParameters([obj]);
        }
        reset();
    }

    const reset = () => {
        setParamName("");
        setMaxValue("");
        setMinValue("");
        setParamDesc("");
    }
    return(
        <React.Fragment>

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
                handleChange={(e) => setParamDesc(e.target.value)}
                value={paramDesc}
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

            <div className="d-flex mx-1 flex-column align-items-center">
                <Button placeholder="Add parameter" handleClick={handleSave} />
            </div>
            
        </React.Fragment>

    )
}