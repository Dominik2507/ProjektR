import React, { useState} from "react";
import Input from "../../components/Form/Input";
import "./inputParamsToolbar.css"

const InputParamsToolbar = ({phaseid, processid,setAllParameters, handleClose}) => {

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
            processid,
            phaseid,
            name: paramName,
            paramDesc,
            minValue,
            maxValue
        };


        setAllParameters(prevParams => {
            let newArr = [...prevParams];
            let index = -1;
            for(let i = 0;  i < newArr.length; i++) {
                if(newArr[i][0].phaseid === phaseid){
                    index = i;
                    break;
                }
            }



            if(index === -1){
                newArr.push([obj]);
            }else {
                newArr[index].push(obj);
            }
            return newArr;
        });
        
        setParamName("");
        setMaxValue("");
        setMinValue("");
        setParamDesc("");
    }


    return(
       <React.Fragment>
        <div id="sidebar-wrapper" className="px-5 w-auto overflow-hidden position-absolute top-0 right-0 h-100 d-flex align-items-center">

            <ul className="w-100 sidebar-nav nav navbar-inverse d-flex flex-column align-items-center justify-content-center w-100 mt-3">
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
                <li className="d-flex">
                    <button  onClick={handleSave} className="btn btn-success me-3" >Save</button>
                    <button  onClick={handleClose} className="btn btn-danger">Close</button>
                </li>
            </ul>
        </div>

        </React.Fragment>

    )
}

export default InputParamsToolbar