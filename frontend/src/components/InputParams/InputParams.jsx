import React, {useEffect, useState, useContext} from "react";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import "./inputParams.css"

const InputParams = ({params,setAllParameters}) => {   

    const [err, setErr] = useState(null);

    const [paramName, setParamName] = useState("");
    const [paramDesc, setParamDesc] = useState("");
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    const handleSave = () => {
        setErr(null);

        const calcId= function(){
            let maxId=0;
            for(let param of params || []){
                maxId= maxId > param.id ? maxId : param.id; 
            }
            return maxId+1;
        }

        if(paramName === ""){
            setErr({
                name: "paramName",
                message: "Parameter name is empty"
            });
            return;
        }

        let obj = {
            "parameterid": calcId(),
            paramName,
            paramDesc,
            minValue,
            maxValue
        };
        if(params){
            setAllParameters([...params, obj]);
        }else{
            setAllParameters([obj]);
        }
        
        setParamName("");
        setMaxValue("");
        setMinValue("");
        setParamDesc("");
    }


    return(
       <React.Fragment>
        
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav nav navbar-inverse">
                <li>
                    <Input
                    type="text"
                    name="paramName"
                    handleChange={(e) => setParamName(e.target.value)}
                    value={paramName}
                    placeholder="Parameter name"
                    error={err}
                    />
                </li>
                <li>
                    <Input
                    type="text"
                    name="paramDesc"
                    handleChange={(e) => setParamDesc(e.target.value)}
                    value={paramDesc}
                    placeholder="Parameter description"
                    error={null}
                    />
                </li>
                <li>
                    <Input
                    type="text"
                    name="paramMin"
                    handleChange={(e) => setMinValue(e.target.value)}
                    value={minValue}
                    placeholder="Min value"
                    error={null}
                    />
                </li>
                <li>
                    <Input
                    type="text"
                    name="paramMax"
                    handleChange={(e) => setMaxValue(e.target.value)}
                    value={maxValue}
                    placeholder="Max value"
                    error={null}
                    />
                </li>
                <li>
                    <div className="d-flex mx-1 flex-column align-items-center">
                        <Button placeholder="Save" handleClick={handleSave} />
                    </div>
                </li>
            </ul>
        </div>
        
        </React.Fragment>

    )
}

export default InputParams