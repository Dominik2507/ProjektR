import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

import "./SearchBar.css";

export default function SearchBar({value, setValue, admin, placeholder}){

    if(admin){
        return (
            <div className="container mt-2 d-flex justify-content-center">
                <div className="row height w-100 d-flex flex-row justify-content-center align-items-center">
                    <div className="form">
                        <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                        <input
                            type="text"
                            className="form-control form-input"
                            placeholder={placeholder}
                            value={value}
                            onChange={setValue}
                        />
                    </div>
                </div>
            </div>
        )    
    }
    return (
        <div className="container mt-2  d-flex justify-content-end">
            <div className="row height w-50 d-flex flex-row justify-content-end align-items-center">
                <div className="form">
                    <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                    <input
                        type="text"
                        className="form-control form-input"
                        placeholder="Search by process title"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
        </div>
    )
}