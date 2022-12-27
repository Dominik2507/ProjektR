import React from "react";
import CreatePhase from "../../pages/CreateProcess/CreatePhase";
import CreateComponent from "../../pages/CreateProcess/CreateComponent";
import Dropdown from "../Dropdown";
import ViewComponentToolbar from "./ViewComponentToolbar";
import { useState } from "react";

export default function ViewSinglePhaseToolbar({phase, process, setProcess, viewMode}){
   const [showDropDown, setShowDropDown]=useState(false);
   const [edit, setEdit]= useState(false);

   const deletePhase=function(){
        //let temp=process.phases;
        let temp=process.phases.filter((v)=>(v.phaseid!==phase.phaseid));
        setProcess({...process, "phases": temp})
   }
    let rows=[];
    for(let component of phase.components || []){
        rows.push(<ViewComponentToolbar key={component.componentid} viewMode={viewMode} component={component} phase={phase} process={process} setProcess={setProcess}/>)
    }

    
    let phaseParams=[];
    for(let param of phase.params || []){
        phaseParams.push(
            <div key={param.parameterid}>
                {param.paramName + " [" + param.minValue + "-" + param.maxValue + "]"}
            </div>
        )
    }

    return(
        <React.Fragment>
            <Dropdown name={phase.name || ("Phase " + (process.phases.indexOf(phase) +1))} >
               {
                edit ? 
                
                <CreatePhase process={process} phase={phase} setProcess={setProcess} setShowDropDown={setShowDropDown} setEdit={setEdit}/>
                
                : 
                
                <>
                    <div>O fazi: {phase.description}</div>
                    <div>Phase parameters:</div>
                    {phaseParams}
                    {rows}
                    
                    {
                        showDropDown ?
                            <Dropdown name="Component" active="true">
                                <CreateComponent phase={phase} process={process} setProcess={setProcess} setShowDropDown={setShowDropDown} />
                            </Dropdown> : 
                            <>
                                <button hidden={viewMode}  onClick={()=> setShowDropDown(true)}> Add component</button>            
                            </>

                    }
                    
                    <button hidden={viewMode} onClick={()=> deletePhase()}> Remove phase</button>
                    <button hidden={viewMode} onClick={()=> setEdit(true)}> Edit phase</button>
                
                </>  
               }
            </Dropdown>
            

        </React.Fragment>
    )
}