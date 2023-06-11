import React from "react";

export default function Modal({children}){
    return (
        <div className="modal" style={{ 
            display:"block"
        }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}