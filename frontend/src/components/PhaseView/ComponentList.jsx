import React from "react";

export default function ComponentList({component, handleClick,componentBtnName}){
    return (
        <div className="card my-2">
            <div className="card-body d-flex flex-row align-items-center justify-content-between">
                <h5 className="card-title">
                    {component.name}
                </h5>
                <button className="btn btn-outline-info" onClick={handleClick} >{componentBtnName}</button>
            </div>
        </div>
    )
}