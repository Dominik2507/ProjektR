import React from "react";

export default function Sidebar({children}){
    return (
        <div className="w-100 h-100">
                <div className="w-100 h-100">
                    <div className="d-flex flex-column align-items-center  align-items-sm-start   h-100 shadow-lg   bg-body rounded ">

                        {children}
                        
                    </div>
                </div>
        </div>
    )
}