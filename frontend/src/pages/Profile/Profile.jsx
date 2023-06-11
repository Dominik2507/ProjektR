import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {backend_paths, routes} from "../../constants/paths";
import SearchBar from "../../components/Form/SearchBar";
import ProcessInlineView from "../../components/ProcessInlineView/ProcessInlineView";
import {Link} from "react-router-dom";

export default function Profile(){
    const { currentUser } = useContext(AuthContext);

    const [currentTab, setCurrentTab] = useState(0);
    const [allProcesses,setAllProcesses] = useState([]);
    const [allFavouriteProcesses, setAllFavouriteProcesses] = useState([]);


    useEffect(() => {
        const getAllProcesse = async () => {
            let data = (await axios.get(`${backend_paths.ALL_USER_PROCESSES}/${currentUser.userid}`)).data;
            setAllProcesses(data);
        };

        const getAllFavProcesses = async () => {
            let data = (await axios.get(`${backend_paths.ALL_FAV_USER_PROCESSES_CRUD}/${currentUser.userid}`)).data;
            setAllFavouriteProcesses(data);
        };
        getAllProcesse();
        if(currentUser) getAllFavProcesses();
    }, []);

    const handleToggleFav = (id) => {

        const favProcess = {
            processId: id,
            userId: currentUser.userid
        };

        if (!allFavouriteProcesses.map(process => process.processid).includes(id)){
            axios.post(`${backend_paths.ALL_FAV_PROCESSES_CRUD}`,favProcess,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => setAllFavouriteProcesses(prevState => {
                    let newState = [...prevState];
                    let index = allProcesses.findIndex(process => process.processid === id);
                    newState.push(allProcesses[index]);
                    return newState;
                }))
                .catch(e => console.log(e));
        }
        else
            axios.delete(`${backend_paths.ALL_FAV_PROCESSES_CRUD}`,{
                data : favProcess,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => setAllFavouriteProcesses(prevState => prevState.filter(process => process.processid !== id)))
                .catch(e => console.log(e));
    }


    const checkFav = (id) => {
        if(allFavouriteProcesses.length === 0) return false;
        return allFavouriteProcesses.findIndex(process => process.processid === id) !== -1;
    }

    return(
            <React.Fragment>
                <div className="d-flex flex-column mx-auto w-100">

                    <div className="card text-center border-0">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                </li>
                                <p
                                    className={currentTab === 0 ? "nav-link active" : "nav-link" }
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setCurrentTab(0)}
                                >
                                    My processes</p>
                                <li className="nav-item">
                                    <p
                                        className={currentTab === 1 ? "nav-link active" : "nav-link" }
                                        style={{
                                        cursor: "pointer",
                                         }}
                                        onClick={() => setCurrentTab(1)}
                                    >
                                        Favorite processes</p>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            {currentTab === 0 &&
                                <div className="container mt-5 w-50">
                                    {allProcesses.length === 0 &&
                                    <React.Fragment>
                                        <h3 className="blockquote"> You don't have any processes</h3>
                                        <Link to={routes.CREATE_PROCESS_URL} className ="btn btn-outline-success" >Create process</Link>
                                    </React.Fragment>
                                    }
                                    {allProcesses.map((process, index) =>
                                        <ProcessInlineView
                                            key={index}
                                            process={process}
                                            handleToogleFav={handleToggleFav}
                                            isFavourite={checkFav(process.processid)}
                                        />)}
                                </div>
                            }

                            {currentTab === 1 &&
                                <div className="container mt-5 w-50">
                                    {allFavouriteProcesses.length === 0 && <h3 className="blockquote"> You don't have any favourites</h3>}
                                    {allFavouriteProcesses.map((process, index) =>
                                        <ProcessInlineView
                                            key={index}
                                            process={process}
                                            handleToogleFav={handleToggleFav}
                                            isFavourite={checkFav(process.processid)}
                                        />)}
                                </div>
                            }
                        </div>
                    </div>




                </div>
            </React.Fragment>
    );
}