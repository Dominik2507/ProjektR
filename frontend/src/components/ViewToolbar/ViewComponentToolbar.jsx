import React from "react";
import CreatePhase from "../../pages/CreateProcess/CreatePhase";
import CreateComponent from "../../pages/CreateProcess/CreateComponent";
import Dropdown from "../Dropdown";
import { useState } from "react";


export default function ViewComponentToolbar({component, phase,process, setProcess, viewMode}){
    const [edit, setEdit]= useState(false);
    const [showDropDown, setShowDropDown]=useState(false);

    const deleteComponent=function(){
        let phaseIndex = process.phases.indexOf(phase)
        let components= process.phases[phaseIndex].components.filter((c)=>c.componentid!==component.componentid);
        let temp=process.phases;
        temp[phaseIndex].components=components
        setProcess({...process, "phases": temp})
    }

    let rows=[];
    for(let param of component.params || []){
        rows.push(
            <div key={param.parameterid}>
                {param.paramName + " [" + param.minValue + "-" + param.maxValue + "]"}
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
                    <div>O komponenti: {component.description || "Treba dodati opis komponente u bazu"}</div>
                    <div>Params: {!component.params ?  "no params" : ""}</div>
                    {rows}
                    {
                        showDropDown ?
                            <Dropdown name="Component">
                                <CreateComponent phase={phase} process={process} setProcess={setProcess} setShowDropDown={setShowDropDown} />
                            </Dropdown> : <></>

                    }
                    <button hidden={viewMode} onClick={()=> deleteComponent()}> Remove component</button>
                    <button hidden={viewMode} onClick={()=> setEdit(true)}> Edit component</button>
                
                </>  
               }
            </Dropdown>

        </React.Fragment>
    )
}