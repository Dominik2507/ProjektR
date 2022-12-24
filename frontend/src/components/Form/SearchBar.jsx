import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

import "./SearchBar.css";

export default function SearchBar({value, setValue}){

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