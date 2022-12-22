import React from "react";
import CreatePhase from "./CreatePhase";
import CreateComponent from "./CreateComponent";
import Dropdown from "../../components/Dropdown";
import { useState } from "react";


export default function ViewComponentToolbar({component, phase,process, setProcess}){
    const [edit, setEdit]= useState(false);
    const [showDropDown, setShowDropDown]=useState(false);

    const deleteComponent=function(){
        let phaseIndex = process.phases.indexOf(phase)
        let components= process.phases[phaseIndex].components.filter((c)=>c.id!==component.id);
        let temp=process.phases;
        temp[phaseIndex].components=components
        setProcess({...process, "phases": temp})
    }

    let rows=[];
    for(let param of component.params){
        rows.push(
            <div key={param.id}>
                {param.paramName + " [" + param.minValue + param.maxValue + "]"}
            </div>
        )
    }

    return(
        <React.Fragment>
            <Dropdown name={component.name}>
            {
                edit ? 
                
                <CreateComponent process={process} phase={phase} component={component} setProcess={setProcess} setShowDropDown={setShowDropDown} setEdit={setEdit}/>
                
                : 
                
                <>
                    <div>O komponenti: {component.description}</div>
                    <div>Params:</div>
                    {rows}
                    {
                        showDropDown ?
                            <Dropdown name="Component">
                                <CreateComponent phase={phase} process={process} setProcess={setProcess} setShowDropDown={setShowDropDown} />
                            </Dropdown> : <></>

                    }
                    <button onClick={()=> deleteComponent()}> Remove component</button>
                    <button onClick={()=> setEdit(true)}> Edit component</button>
                
                </>  
               }
            </Dropdown>

        </React.Fragment>
    )
}