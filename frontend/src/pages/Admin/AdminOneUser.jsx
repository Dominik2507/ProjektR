import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "./DropdownList";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export default function AdminOneProcess(){
    const { id } = useParams();
    const [user, setUser]=useState(null);
    const [processList, setProcessList]=useState(null);
    const [edit, setEdit]=useState(false);
    const [form, setForm]= useState(null);
    const [refreshToken, setRefreshToken]=useState(true);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [openInfoSnackbar, setOpenInfoSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const urlParams = new URLSearchParams(window.location.search);
    const navigate= useNavigate();

    useEffect(() => {
        if(!edit && urlParams.has('edit')) setEdit(true);
        if(!id) return;
        axios.get(`${backend_paths.GET_USER_BY_ID}/${id}`)
            .then(res => res.data)
            .then(data => {
                console.log("user", data)
                setUser(data);
                setForm(data);
            })
            .catch(err => console.log(err));

        const getAllProcesse = async () => {
            let data = (await axios.get(`${backend_paths.ALL_USER_PROCESSES}/${id}`)).data;
            setProcessList(data);
        };

        getAllProcesse();
        }, [refreshToken])

    function handleDelete(){
        if(!window.confirm("Are you sure you want to delete this user? This action will be unreversible.")) return;

        axios.delete(`${backend_paths.GET_USER_BY_ID}/${user.userid}`)
        .then(res => {
            handleSnackbarOpen("success", "User deleted succesfuily!");
            navigate("/admin/users")
        })
        .catch(err => handleSnackbarOpen("error", err.msg));
    }

    function handleSave(){
        if(!form.email || form.email=="" || !form.password || form.password=="" || !form.userid || (form.name && form.firstname) || (!form.name && !form.firstname)) return;
        if(window.confirm(JSON.stringify(form)))
        axios.put(`${backend_paths.GET_USER_BY_ID}`, form)
            .then(res => {if(res.status==200){
                setEdit(false);
                setRefreshToken(prev=>!prev);
                handleSnackbarOpen("success", "Changes saved succesfuily!");
            }})
            .catch(err => handleSnackbarOpen("error", err.msg))
    }

    function handleReset(){
        handleSnackbarOpen("info", "Changes reset");
        setRefreshToken(prev=>!prev);
    }

    const handleSnackbarOpen = (type, msg) => {

        switch(type){
            case "success":
                setSnackbarMessage(msg);
                setOpenSuccessSnackbar(true);
                return;
            case "error":
                setSnackbarMessage(msg);
                setOpenErrorSnackbar(true);
                return;
            case "info":
                setSnackbarMessage(msg);
                setOpenInfoSnackbar(true);
                return;
        }
    };
    
    const handleSnackbarClose = () => {
        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar(false);
        setOpenInfoSnackbar(false);
    };
    
    
    return(
        <div className="w-100" style={{textAlign:"left"}}>
           <div className="d-flex flex-row align-items-center justify-content-center m-3">
                <h2>{user?.type=="personal" ? user?.firstname + " " + user?.lastname : user?.name}</h2>
            </div>
            <div className="position-absolute end-0 top-0 p-4 d-flex flex-row justify-content-center gap-3 m-1">
                <FontAwesomeIcon icon={faEdit} cursor="pointer" onClick={()=> setEdit(prev => !prev)}/>
                <FontAwesomeIcon icon={faTrash} cursor="pointer" onClick={handleDelete}/>
            </div>
            
            <hr/>
            
            {
                !edit ?
                
                <div className="ps-3">
                    <div>email: {user?.email}</div>
                    {
                        user?.type=="personal" ? 
                            <>
                                <div>first name: {user?.firstname}</div>
                                <div>last name: {user?.lastname}</div>
                            </> : 
                            <>
                                <div>company name: {user?.name}</div>
                                <div>CEO: {user?.ceo}</div>
                            </>
                    }
                    <div>password: {user?.password}</div>
               </div>
               :
               <div className="ps-3 d-flex flex-column gap-3 w-25">
                    <div><label className="d-flex flex-row justify-content-between w-75"> <span> email: </span><input id="email" name="email"  value={form?.email} onChange={(e)=>{ setForm((prev)=> setForm({...prev, "email": e.target.value})) }}></input></label></div>
                    <div hidden={user?.type!="personal"}> <label className="d-flex flex-row justify-content-between w-75"> <span> firstname: </span><input id="firstname" name="firstname" value={form?.firstname || ""} onChange={(e)=>{ setForm((prev)=> setForm({...prev, "firstname": e.target.value})) }}></input></label></div>
                    <div hidden={user?.type!="personal"}> <label className="d-flex flex-row justify-content-between w-75"> <span> lastname: </span> <input id="lastname" name="lastname" value={form?.lastname || ""} onChange={(e)=>{ setForm((prev)=> setForm({...prev, "lastname": e.target.value})) }}></input></label></div>
                    <div hidden={user?.type=="personal"}> <label className="d-flex flex-row justify-content-between w-75"> <span> company name: </span><input id="name" name="name" value={form?.name || ""} onChange={(e)=>{ setForm((prev)=> setForm({...prev, "name": e.target.value})) }}></input></label></div>
                    <div hidden={user?.type=="personal"}><label className="d-flex flex-row justify-content-between w-75"> <span> ceo: </span> <input id="ceo" name="ceo" value={form?.ceo || ""} onChange={(e)=>{ setForm((prev)=> setForm({...prev, "ceo": e.target.value})) }}></input></label></div>
                    <div><label className="d-flex flex-row justify-content-between w-75"> <span> password: </span> <input id="password" name="password" value={form?.password} onChange={(e)=>{ setForm((prev)=> setForm({...prev, "password": e.target.value})) }}></input></label></div>  
                    <div className="p-2 d-flex gap-1">
                            <button onClick={handleSave}> Save </button>
                            <button onClick={handleReset}> Reset </button>
                    </div>
               </div>
 
            }
                        
            <hr/>
            {
                processList?.length > 0 &&
                <DropdownList name={"Process list:"} className="ps-3">
                    {processList?.map(process => <Link className="d-block" to={`/admin/process/${process?.processid}`}> {process?.name} </Link>)}
                </DropdownList>
            }
            <Snackbar
                open={openSuccessSnackbar}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={openErrorSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={openInfoSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

        </div>
    )
}