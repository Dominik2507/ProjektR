import React, {useEffect, useState, useContext} from "react";
import ProcessInlineView from "../../components/ProcessInlineView/ProcessInlineView";
import SearchBar from "../../components/Form/SearchBar";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import {AuthContext} from "../../context/AuthContext";

export default function ViewAllProcess(){

    const { currentUser } = useContext(AuthContext);

    const [searchValue, setSearchValue] = useState("");
    const [allProcesses,setAllProcesses] = useState([]);
    const [allFavouriteProcesses, setAllFavouriteProcesses] = useState([]);


    useEffect(() => {
        const getAllProcesse = async () => {
            let data = (await axios.get(backend_paths.ALL_PROCESSES)).data;
            setAllProcesses(data);
        };

        const getAllFavProcesses = async () => {
          let data = (await axios.get(`${backend_paths.ALL_FAV_PROCESSES_CRUD}/${currentUser.userid}`)).data;
          setAllFavouriteProcesses(data.map(fav => fav.processid));
        };
        getAllProcesse();
        if(currentUser) getAllFavProcesses();
    }, []);

    const handleToggleFav = (id) => {

        const favProcess = {
            processId: id,
            userId: currentUser.userid
        };

        if (!allFavouriteProcesses.includes(id)){
            axios.post(`${backend_paths.ALL_FAV_PROCESSES_CRUD}`,favProcess,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => setAllFavouriteProcesses(prevState => [...prevState, id]))
                .catch(e => console.log(e));
        }
        else
            axios.delete(`${backend_paths.ALL_FAV_PROCESSES_CRUD}`,{
                data : favProcess,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => setAllFavouriteProcesses(prevState => prevState.filter(process => process !== id)))
                .catch(e => console.log(e));
    }


    const getSearchedProcess = () => {
        if(allProcesses.length === 0) return [];
        return  allProcesses.filter(process => process.name.startsWith(searchValue));
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }


    const checkFav = (id) => {
        if(allFavouriteProcesses.length === 0) return false;
        return allFavouriteProcesses.findIndex(process => process === id) !== -1;
    }


    return(
        <React.Fragment>
            <div className="position-absolute w-75 top-10 end-0">
                <SearchBar value = {searchValue} setValue = {handleChange}/>
            </div>

        <div className="d-flex flex-column mx-auto w-100">

            <div className="container mt-5 w-50">
                {getSearchedProcess().map((process,index) => <ProcessInlineView key = {index} process={process} handleToogleFav = {handleToggleFav} isFavourite = {checkFav(process.processid)}/> ) }
            </div>

        </div>
        </React.Fragment>
    )
}