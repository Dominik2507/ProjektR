import React, {useEffect, useState, useContext} from "react";
import ProcessInlineView from "../../components/ProcessInlineView/ProcessInlineView";
import SearchBar from "../../components/Form/SearchBar";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import {AuthContext} from "../../context/AuthContext";
import AdminReportInlineView from "./AdminReportInlineView";
import Reports from "../../assets/textData/reports.json"

export default function ReportList(){


    const [searchValue, setSearchValue] = useState("");
    const [allReports,setReports] = useState([]);
    const [refresh, setRefreshToken]= useState(true);

    const handleRefresh= ()=> {
        setRefreshToken(prev=> !prev)
    }


    useEffect(() => {
        const getReports = async () => {
            let data = (await axios.get(backend_paths.ALL_REPORTS)).data;
            console.log(data)
            setReports(data);
        };

        getReports();
    }, [refresh]);

    const getSearchedProcess = () => {
        if(allReports.length === 0) return [];
        return  allReports.filter(report => (report.owner.type == "personal" ? report.owner.firstname + report.owner.lastname : report.owner.name).toUpperCase().includes(searchValue.toUpperCase()) || 
                                            (report.reportedby.type == "personal" ? report.reportedby.firstname + report.reportedby.lastname : report.reportedby.name).toUpperCase().includes(searchValue.toUpperCase()) ||
                                            (report.processName).toUpperCase().includes(searchValue.toUpperCase()));
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    return(
        <div className="w-100" style={{position: 'relative'}}>
            <h2 className="mt-3 pb-2 border-bottom">
                REPORTS
            </h2>
            <div style={{position: 'absolute', top: 5, right: 0, width: '400px'}}>
                <SearchBar value = {searchValue} setValue={handleChange} admin={true} placeholder={"Search reports"}/>
            </div>
            

            <div className="d-flex flex-column mx-auto w-100">
                <div className="container w-50">
                    
                    {getSearchedProcess().length > 0 ? getSearchedProcess().map((report,index) => <AdminReportInlineView refresh={handleRefresh} key = {index} report={report} /> ) : 
                    <div style={{height:"50%", width: "100%", paddingTop: "25%", textAlign: "center", fontSize: "24px"}}> There are no reported processes at this time. </div>
                    }
                </div>
            </div>
        </div>
    )
}