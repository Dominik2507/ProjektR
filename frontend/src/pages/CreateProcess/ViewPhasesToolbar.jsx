import React from "react";
import CreatePhase from "./CreatePhase";
import CreateComponent from "./CreateComponent";
import Dropdown from "../../components/Dropdown";
import CreatePhaseToolbar from "./CreatePhaseToolbar";
import ViewSinglePhaseToolbar from "./ViewSinglePhaseToolbar";
import { useState } from "react";

export default function ViewPhasesToolbar({process, setProcess}){

    const [showDropDown, setShowDropDown]=useState(false);

    let rows=[];
    for(let phase of process.phases){
        rows.push(
            <div key={phase.id}  className={ phase.id%2==0 ? "bg-danger" : "bg-success"}>
                <ViewSinglePhaseToolbar key={phase.id} process={process} phase={phase} setProcess={setProcess}/>
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
                 <><button onClick={()=> setShowDropDown(true)}> Add phase</button></>
                
            }
            
            
            
        </div>
    )
}