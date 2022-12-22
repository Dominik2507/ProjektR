import React from "react";
import CreatePhase from "./CreatePhase";
import CreateComponent from "./CreateComponent";
import Dropdown from "../../components/Dropdown";
import ViewComponentToolbar from "./ViewComponentToolbar";
import { useState } from "react";

export default function ViewSinglePhaseToolbar({phase, process, setProcess}){
   const [showDropDown, setShowDropDown]=useState(false);
   const [edit, setEdit]= useState(false);
   const deletePhase=function(){
        //let temp=process.phases;
        let temp=process.phases.filter((v)=>(v.id!==phase.id));
        setProcess({...process, "phases": temp})
   }
    let rows=[];
    for(let component of phase.components){
        rows.push(<ViewComponentToolbar key={component.id} component={component} phase={phase} process={process} setProcess={setProcess}/>)
    }

    return(
        <React.Fragment>
            <Dropdown name={phase.name} >
               {
                edit ? 
                
                <CreatePhase process={process} phase={phase} setProcess={setProcess} setShowDropDown={setShowDropDown} setEdit={setEdit}/>
                
                : 
                
                <>
                    <div>O fazi: {phase.description}</div>
                    {rows}
                    {
                        showDropDown ?
                            <Dropdown name="Component" active="true">
                                <CreateComponent phase={phase} process={process} setProcess={setProcess} setShowDropDown={setShowDropDown} />
                            </Dropdown> : 
                            <>
                                <button onClick={()=> setShowDropDown(true)}> Add component</button>            
                            </>

                    }
                    
                    <button onClick={()=> deletePhase()}> Remove phase</button>
                    <button onClick={()=> setEdit(true)}> Edit phase</button>
                
                </>  
               }
            </Dropdown>
            

        </React.Fragment>
    )
}