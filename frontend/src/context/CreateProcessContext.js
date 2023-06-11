import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {backend_paths, routes} from "../constants/paths";
import { AuthContext } from "./AuthContext";

export const CreateProcessContext = createContext(null);

export default function CreateProcessProvider({children}){
    console.log("info",localStorage.getItem("info"))
    const [processInfo, setProcessInfo] = useState(localStorage.getItem("info") ? JSON.parse(localStorage.getItem("info")):{});
    const [allPhases, setAllPhases] = useState([]);
    const [allComponents, setAllComponent] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const createProcess = async (process) => {
        if(!window.confirm("End proces creation? You will not be able to make changes later on.")) return
        return axios.post(backend_paths.CREATE_PROCESS ,process, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => {
                navigate(routes.PROFILE_URL);
                return res.data;
            })
            .catch(err => err.response.data);

    };
    useEffect(()=>{
        if(!currentUser){
            setProcessInfo(null);
        }
    }, [currentUser])

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