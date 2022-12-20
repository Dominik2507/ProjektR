import React from "react";
import processList from "../../assets/textData/publicProcess.json"
import ProcessInlineView from "./ProcessInlineView";

export default function ViewAllProcess(){
    let rows=[];
    for(let process of processList){
        rows.push(
            <ProcessInlineView process={process}/>
        )
    }
    return(
        <div className="d-flex flex-column justify-content-start">
            <h1>Procesi</h1>
            <div>
                 {rows}
            </div>
           
        </div>
    )
}