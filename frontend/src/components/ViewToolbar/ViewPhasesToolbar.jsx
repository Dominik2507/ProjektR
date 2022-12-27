import React from "react";
import CreatePhase from "../../pages/CreateProcess/CreatePhase";
import CreateComponent from "../../pages/CreateProcess/CreateComponent";
import Dropdown from "../Dropdown";
import CreatePhaseToolbar from "../../pages/CreateProcess/CreatePhaseToolbar";
import ViewSinglePhaseToolbar from "./ViewSinglePhaseToolbar";
import { useState } from "react";

export default function ViewPhasesToolbar({process, setProcess, viewMode}){

    const [showDropDown, setShowDropDown]=useState(false);

    let rows=[];
    for(let phase of process.phases || []){
        rows.push(
            <div key={phase.phaseid}  className={ phase.phaseid%2==0 ? "bg-danger" : "bg-success"}>
                <ViewSinglePhaseToolbar key={phase.phaseid} process={process} phase={phase} setProcess={setProcess} viewMode={viewMode}/>
            </div>
        )
    }
    return(
        <div>
            {rows}

            {
                showDropDown?
                    
                 <CreatePhaseToolbar process={process} setProcess={setProcess} setShowDropDown={setShowDropDown}/> 
                 : 
                 <>{!viewMode ? <button onClick={()=> setShowDropDown(true)}> Add phase</button>: ""}</>
                
            }
            
            
            
        </div>
    )
}