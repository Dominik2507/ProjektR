import React from "react";
import CreatePhaseToolbar from "../../pages/CreateProcess/CreatePhaseToolbar";
import ViewSinglePhaseToolbar from "./ViewSinglePhaseToolbar";
import { useState } from "react";
import Button from "../Form/Button";

export default function ViewPhasesToolbar({process, setProcess, viewMode}){

    const [showDropDown, setShowDropDown]=useState(false);

    let rows=[];
    for(let phase of process.phases || []){
        rows.push(
            <div key={phase.phaseid}>
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
                 <>
                    {!viewMode ? 
                        <div className="d-flex w-100 flex-column justify-content-center align-items-center">
                            <Button placeholder="Add phase" handleClick={()=> setShowDropDown(true)}/>
                        </div>
                        : 
                        <></>
                    }
                </>
                 
                
            }
            
            
            
        </div>
    )
}