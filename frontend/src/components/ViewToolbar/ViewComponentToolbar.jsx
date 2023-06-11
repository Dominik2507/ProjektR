import React from "react";
import CreatePhase from "../../pages/CreateProcess/CreatePhase";
import CreateComponent from "../../pages/CreateProcess/CreateComponent";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import Button from "../Form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function ViewComponentToolbar({component, phase,process, setProcess, viewMode}){
    const [edit, setEdit]= useState(false);
    const [showDropDown, setShowDropDown]=useState(false);
    const [allParameters, setAllParameters] = useState(component?.params || []);

    const deleteComponent=function(){
        let phaseIndex = process.phases.indexOf(phase)
        let components= process.phases[phaseIndex].components.filter((c)=>c.componentid!==component.componentid);
        let temp=process.phases;
        temp[phaseIndex].components=components
        setProcess({...process, "phases": temp})
    }

    console.log(component)
    let rows=[];
    for(let param of allParameters){
        rows.push(
        <div key={param.paramName}>
            {param.paramName + " [" + param.minValue + "-"+ param.maxValue + "]" + " / " + param.paramDesc}
            <button onClick={()=>{setAllParameters(allParameters.filter((p => p.id!==param.parameterid)))}} style={{"backgroundColor": "inherit"}} className="border-0 mx-2"></button>
        </div>)
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
                        !viewMode &&
                            <div className="d-flex mx-1 flex-column align-items-center">
                                {
                                rows?.length > 0 ?
                                <>
                                    <div>Params:</div> 
                                    {rows}
                                </>
                                :
                                <div> No parameters for this component</div>
                                }
                            </div>  
                    }
                
                </section>  
               }
            </Dropdown>

        </React.Fragment>
    )
}