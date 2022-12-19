import React, {useState} from "react";
import Input from "../../components/Form/Input";
import Dropdown from "../../components/Dropdown";
import ParameterInput from "../../components/ParameterInput";
import Button from "../../components/Form/Button";
import Select from "../../components/Form/Select";

export default function CreateComponent({setComponent,phases,parameterInfo,setParameterInfo}){

    const [componentName, setComponentName] = useState("")
    const [phaseSelectValue, setPhaseSelectValue] = useState();

    const handleSave = () => {
        let obj = {
            componentName,
            phaseId: phaseSelectValue,
            parameters: parameterInfo
        };

        if(parameterInfo.name === "") delete obj.parameterInfo;

        //TODO: Save component to DB

        setComponent(prevComponent => [...prevComponent, obj]);
        setComponentName("");
    }


    return(
        <React.Fragment>
            <Input
                type="text"
                placeholder="Component name"
                name="componentName"
                value={componentName}
                error={null}
                handleChange={(e) => setComponentName(e.target.value)}
            />
            <Dropdown name="Component parameter">
                <ParameterInput setAllParameters={setComponent} parameterInfo={parameterInfo} setParameterInfo={setParameterInfo}/>
            </Dropdown>
            <Select options={phases} setSelected={setParameterInfo} />
            <Button placeholder="Add component" handleClick={handleSave}/>
        </React.Fragment>
    );

}