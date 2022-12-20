import React, {useContext, useState} from "react";
import Input from "../../components/Form/Input";
import Dropdown from "../../components/Dropdown";
import ParameterInput from "../../components/ParameterInput";
import Button from "../../components/Form/Button";
import Select from "../../components/Form/Select";
import {CreateProcessContext} from "../../context/CreateProcessContext";

export default function CreateComponent(){

    const [componentName, setComponentName] = useState("")
    const [phaseSelectValue, setPhaseSelectValue] = useState("notSelected");
    const [allParameters, setAllParameters] = useState([]);
    const [err, setErr] = useState(null);
    const {allPhases, setAllComponent} = useContext(CreateProcessContext);

    const handleSave = () => {
        setErr(null);

        if(componentName === ""){
            setErr({
                name: "componentName",
                message: "Component name is empty"
            });
            return;
        }

        //TODO: SAVE COMPONENT TO DB

        let obj = {
            componentName,
            phaseId: phaseSelectValue,
            parameters: allParameters
        };



        setAllComponent(prevComponent => [...prevComponent, obj]);
        setComponentName("");
        setPhaseSelectValue("notSelected");
    }


    return(
        <React.Fragment>
            <Input
                type="text"
                placeholder="Component name"
                name="componentName"
                value={componentName}
                error={err}
                handleChange={(e) => setComponentName(e.target.value)}
            />
            <Dropdown name="Component parameter">
                <ParameterInput setAllParameters={setAllParameters} />
            </Dropdown>
            <Select options={allPhases} selected={phaseSelectValue} setSelected={setPhaseSelectValue} />
            <Button placeholder="Add component" handleClick={handleSave}/>
        </React.Fragment>
    );

}