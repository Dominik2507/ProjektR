import React, {useEffect, useState, useContext} from "react";
import ProcessInlineView from "../../components/ProcessInlineView/ProcessInlineView";
import SearchBar from "../../components/Form/SearchBar";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import {AuthContext} from "../../context/AuthContext";
import AdminProcessInlineView from "./AdminProcessInlineView";

export default function ProcessList(){


    const [searchValue, setSearchValue] = useState("");
    const [allProcesses,setAllProcesses] = useState([]);
    const [refreshToken, setRefreshToken]=useState(true);

    const handleRefresh=()=>{setRefreshToken(prev => !prev)}

    useEffect(() => {
        const getAllProcesse = async () => {
            let data = (await axios.get(backend_paths.ALL_PROCESSES)).data;
            console.log("process list", data)
            setAllProcesses(data);
        };

        getAllProcesse();
    }, [refreshToken]);

    const getSearchedProcess = () => {
        if(allProcesses.length === 0) return [];
        return  allProcesses.filter(process => process.name.toUpperCase().includes(searchValue.toUpperCase()));
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    return(
        <div className="w-100" style={{position: 'relative'}}>
            <h2 className="mt-3 pb-2 border-bottom">
                PROCESSES
            </h2>
            <div style={{position: 'absolute', top: 5, right: 0, width: '400px'}}>
                    <SearchBar value = {searchValue} setValue={handleChange} admin={true} placeholder="Search by process title" />
            </div>
            <div className="d-flex flex-column mx-auto w-100">
                <div className="container w-50">
                    {getSearchedProcess().map((process,index) => <AdminProcessInlineView key = {index} process={process} refresh={handleRefresh}/> ) }
                </div>
            </div>

        </div>
    )
}