import React, {useContext, useState} from "react";
import Input from "../../components/Form/Input";
import Dropdown from "../../components/Dropdown";
import ParameterInput from "../../components/ParameterInput";
import Button from "../../components/Form/Button";
import Select from "../../components/Form/Select";
import {CreateProcessContext} from "../../context/CreateProcessContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export default function CreateComponent({process, setProcess, phase, component=null, setShowDropDown, setEdit=null}){

    const [componentName, setComponentName] = useState(component?.name || "")
    const [phaseSelectValue, setPhaseSelectValue] = useState("notSelected");
    const [allParameters, setAllParameters] = useState(component?.params || []);
    const [err, setErr] = useState(null);
    const {allPhases, setAllComponent} = useContext(CreateProcessContext);


    const calcId= function(){
        let maxId=0;
        for(let component of phase.components){
            maxId= maxId > component.id ? maxId : component.id; 
        }
        return maxId+1;
    }

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
        let temp=process.phases
        let indexP=temp.indexOf(phase)

        if(component){
            let indexC=temp[indexP].components.indexOf(component)
            temp[indexP].components[indexC]={
                "id": component.id,
                "name": componentName,
                "params": [...allParameters]
            }
            setProcess({...process, "phases": temp})
            setEdit(false);
        }else{
            temp[indexP].components.push(
                {
                    "id": calcId(),
                    "name": componentName,
                    "params": [...allParameters]
                }
            )

        }

        setShowDropDown(false)
        let obj = {
            componentName,
            phaseId: phaseSelectValue,
            parameters: allParameters
        };



        setAllComponent(prevComponent => [...prevComponent, obj]);
        setComponentName("");
        setPhaseSelectValue("notSelected");
    }


   
    let rows=[];
    for(let param of allParameters){
        rows.push(
        <div key={param.id}>
            {param.paramName + " [" + param.minValue + "-"+ param.maxValue + "]"}
            <button onClick={()=>{setAllParameters(allParameters.filter((p => p.id!==param.id)))}} className="bg-danger mx-2"><FontAwesomeIcon icon={faTrash}/></button>
        </div>)
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
            <div>Params</div>
            {rows}
            <Dropdown name="Add a parameter">
                <ParameterInput params={allParameters} setAllParameters={setAllParameters} />
            </Dropdown>
            { false ? <Select options={allPhases} selected={phaseSelectValue} setSelected={setPhaseSelectValue} /> : ""}
            <Button placeholder={component ? "Save changes" : "Add component"} handleClick={handleSave}/>
            <Button placeholder={"Cancel"} handleClick={()=>{component ? setEdit(false) : setShowDropDown(false)}}/>
        </React.Fragment>
    );

}