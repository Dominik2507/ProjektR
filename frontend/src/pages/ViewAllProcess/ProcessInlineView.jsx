import React from "react";

export default function ProcessInlineView({process, trenerid}){
 
    return(
        <div className="w-80 d-flex justify-content-between p-2 m-3"
            style={{
                backgroundColor: "#b1bace"
                }}
        >
            <div>
                <h4 className="text-start">{process.name} {process.userId === trenerid ? "+" : ""}</h4>
                <div>{process.start_datetime} - {process.end_datetime || "Ongoing"}</div>
            </div>
            <div className="d-flex flex-column justify-content-center">
                <div>{process.description}</div>
            </div>
            <div className="d-flex flex-column justify-content-center">
               <div>Owner: {process.userId}</div>
            </div>
        </div>
    )
}