import React, {useState} from "react";
import processList from "../../assets/textData/publicProcess.json"
import ProcessInlineView from "./ProcessInlineView";
import SearchBar from "../../components/Form/SearchBar";

export default function ViewAllProcess(){
    const [searchValue, setSearchValue] = useState("");

    const getSearchedProcess = () => {
        return  processList.filter(process => process.name.startsWith(searchValue));
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    return(
        <React.Fragment>
            <div className="position-absolute w-75 top-10 end-0">
                <SearchBar value = {searchValue} setValue = {handleChange}/>
            </div>

        <div className="d-flex flex-column mx-auto w-100">

            <div className="container mt-5 w-50">
                {getSearchedProcess().map(process => <ProcessInlineView key = {process.processId} process={process}/> ) }
            </div>
           
        </div>
        </React.Fragment>
    )
}