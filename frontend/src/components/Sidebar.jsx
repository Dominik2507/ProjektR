import React from "react";

export default function Sidebar({children}){
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 w-100">
                    <div className="d-flex flex-column align-items-center  align-items-sm-start   min-vh-100 shadow-lg   bg-body rounded w-100">

                        {children}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}