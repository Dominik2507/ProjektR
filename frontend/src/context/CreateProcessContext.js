import axios from "axios";
import React, { createContext, useState } from "react";
import {backend_paths, routes} from "../constants/paths";

export const CreateProcessContext = createContext(null);

export default function CreateProcessProvider({children}){
    const [processInfo, setProcessInfo] = useState({});
    const [allPhases, setAllPhases] = useState([]);
    const [allComponents, setAllComponent] = useState([]);
    
    const createProcess = async (process) => {
        return axios.post(backend_paths.CREATE_PROCESS ,process, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => {
                console.log(res.data)
                return res.data;
            })
            .catch(err => err.response.data);

    };

    const value = {
        processInfo,
        setProcessInfo,
        allPhases,
        setAllPhases,
        allComponents,
        setAllComponent,
        createProcess
    };

    return <CreateProcessContext.Provider value={value}>{children}</CreateProcessContext.Provider>
}