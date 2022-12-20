import React, { createContext, useState } from "react";

export const CreateProcessContext = createContext(null);

export default function CreateProcessProvider({children}){
    const [processInfo, setProcessInfo] = useState({});
    const [allPhases, setAllPhases] = useState([]);
    const [allComponents, setAllComponent] = useState([]);


    const value = {
        processInfo,
        setProcessInfo,
        allPhases,
        setAllPhases,
        allComponents,
        setAllComponent
    };

    return <CreateProcessContext.Provider value={value}>{children}</CreateProcessContext.Provider>
}