import React from "react";
import CreatePhase from "../../pages/CreateProcess/CreatePhase";
import CreateComponent from "../../pages/CreateProcess/CreateComponent";
import Dropdown from "../Dropdown";
import { useState } from "react";
import Button from "../Form/Button";


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


    return(
        <React.Fragment>
            <Dropdown name={component.name} viewMode={viewMode} handleDelete={deleteComponent} handleEdit={()=> setEdit(true)}>
            {
                edit ? 
                
                <CreateComponent process={process} phase={phase} component={component} setProcess={setProcess} setShowDropDown={setShowDropDown} setEdit={setEdit}/>
                
                : 
                
                <section className="p-2">
            
                    {
                        showDropDown &&
                            <Dropdown name="Component">
                                <CreateComponent phase={phase} process={process} setProcess={setProcess} setShowDropDown={setShowDropDown} />
                            </Dropdown>
                    }
                    {
                        !viewMode && false &&
                            <div className="d-flex mx-1 flex-column align-items-center">
                                <Button placeholder="Remove component" handleClick={()=> deleteComponent()}/>
                                <Button placeholder="Edit component" handleClick={()=> setEdit(true)}/>
                            </div>  
                    }
                    
                
                </section>  
               }
            </Dropdown>

        </React.Fragment>
    )
}