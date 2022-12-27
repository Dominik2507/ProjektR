import React, {useContext, useState} from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import {backend_paths, routes} from "../../constants/paths";

import ViewPhasesToolbar from "../../components/ViewToolbar/ViewPhasesToolbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ViewOneProcess(){
    const [process, setProcess]=useState({})
    let params=useParams();

    useEffect(() => {
        const getAllProcesse = async () => {
            let data = (await axios.get(`${backend_paths.ONE_PROCESS}/${params.id}`)).data;
            console.log(data)
            setProcess(data);
        };

        getAllProcesse();
    }, []);
  


   
    return (
        <React.Fragment>
            <Sidebar>
                
                <div className="processSidebar">
                    <h4 className="m-3">{process?.name}</h4>
                    <ViewPhasesToolbar process={process} setProcess={setProcess} viewMode={true}/>
                </div>
            </Sidebar>

        </React.Fragment>
    );
}