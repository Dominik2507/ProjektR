import React, {useEffect, useState, useContext} from "react";
import ProcessInlineView from "../../components/ProcessInlineView/ProcessInlineView";
import SearchBar from "../../components/Form/SearchBar";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import {AuthContext} from "../../context/AuthContext";
import AdminUserInlineView from "./AdminUserInlineView";

export default function UserList(){

    const { currentUser } = useContext(AuthContext);

    const [searchValue, setSearchValue] = useState("");
    const [allUsers,setUsers] = useState([]);
    const [refreshToken, setRefreshToken]=useState(true);

    const handleRefresh=()=>{setRefreshToken(prev => !prev)}

    useEffect(() => {
        const getUsers = async () => {
            let data = (await axios.get(backend_paths.ALL_USERS)).data;
            console.log(data)
            setUsers(data);
        };

        getUsers();
    }, [refreshToken]);

    const getSearchedProcess = () => {
        if(allUsers.length === 0) return [];
        return  allUsers.filter(user => (user.firstname + " " + user.lastname).toUpperCase().includes(searchValue.toUpperCase()));
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    return(
        <div className="w-100" style={{position: 'relative'}}>
            <h2 className="mt-3 pb-2 border-bottom">
                USERS
            </h2>
            <div style={{position: 'absolute', top: 5, right: 0, width: '400px'}}>
                <SearchBar value = {searchValue} setValue={handleChange} admin={true} placeholder={"Search users"}/>
            </div>
    

            <div className="d-flex flex-column mx-auto w-100">
                <div className="container w-50">
                    {getSearchedProcess().map((user,index) => <AdminUserInlineView key = {index} user={user} refresh={handleRefresh} /> ) }
                </div>
            </div>
        </div>
    )
}