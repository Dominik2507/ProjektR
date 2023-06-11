import React, {useEffect, useState, useContext} from "react";
import ProcessInlineView from "../../components/ProcessInlineView/ProcessInlineView";
import SearchBar from "../../components/Form/SearchBar";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import {AuthContext} from "../../context/AuthContext";
import AdminUserInlineView from "./AdminUserInlineView";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCheckCircle, faCircleCheck, faCircleXmark, faEdit, faSave, faTrash, faTrashCan, faWarning } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "./DropdownList";
import dayjs from "dayjs";
import {nanoid} from "nanoid";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';






export default function AdminOneProcess(){
    const { id } = useParams();
    const [process, setProcess]=useState(null);
    const [batchList, setBatchList]=useState([])
    const [batchIndex, setBatchIndex]=useState(localStorage.getItem("batchIndex") || 0);
    const [hash, setHash]=useState(null);
    const [parameter, setParameter]=useState(null);
    const [parameterOf, setParameterSource]=useState({phaseName: "", componentName: ""});
    const [parameterInfo, setParametersInfo] = useState();
    const [refreshToken, setRefreshToken]=useState(true);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [openInfoSnackbar, setOpenInfoSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [edit, setEdit]=useState(false);
    const [form, setForm]= useState(null);

    let processParams=process?.params;
    let phases=process?.phases;
    const urlParams = new URLSearchParams(window.location.search);

    const navigate = useNavigate()

    useEffect(() => {
        if(!edit && urlParams.has('edit')) setEdit(true);
        if(!id) return;
        axios.get(`${backend_paths.GET_PROCESS_BY_ID}/${id}`)
            .then(res => res.data)
            .then(data => {
                console.log("process", data)
                setBatchList(data);
                setProcess(data[batchIndex]);
                setForm(data[batchIndex])
            })
            .catch(err => console.log(err));

        axios.get(`${backend_paths.HASH}/${id}`)
            .then(res => res.data)
            .then(data => {
                console.log("hash",data)
                setHash(data.transactionid)
            })
            .catch(err => console.log(err));
    }, [refreshToken])

    useEffect(()=>{
        localStorage.setItem("batchIndex", batchIndex)
        setProcess(batchList[batchIndex]);
        setForm(batchList[batchIndex])
        setParameter(null)
        return ()=> localStorage.removeItem("batchIndex");
    }, [batchIndex])

    

    useEffect(() => {
        if(parameter?.parameterid==null) return;
        const data={
            parameterid: parameter.parameterid,
            batchid: process.batchid
        }
        axios.post(`${backend_paths.LOG}/parameter`, data)
            .then(res => res.data)
            .then(data => setParametersInfo(data))
            .catch(err => handleSnackbarOpen("error", err.msg))
    }, [parameter?.parameterid]);


    function handleSetParamTable(paramObj, phaseName, componentName=null){
        setParameter(paramObj);
        setParameterSource({phaseName: phaseName, componentName:componentName});
    }

    function handleChangePhases(e, phaseIndex){
        let phasesClone=form?.phases;
        phasesClone[phaseIndex][e.target.name]=e.target.value;
        setForm(prev => setForm({...prev, "phases": phasesClone}));
    }
    
    function handleChangePhaseParams(e, phaseIndex, paramIndex){
        let phasesClone=form?.phases;
        phasesClone[phaseIndex].params[paramIndex][e.target.name]=e.target.value;
        setForm(prev => setForm({...prev, "phases": phasesClone}));
    }

    function handleChangeComponent(e, phaseIndex, comIndex){
        let phasesClone=form?.phases;
        if(phasesClone === undefined) {
            console.log("Phases is null", form)
            return;
        }
        let componentsClone = phasesClone[phaseIndex].components;
        if(componentsClone === undefined) {
            console.log("Components is null", phasesClone)
            return;
        }

        phasesClone[phaseIndex].components[comIndex][e.target.name]=e.target.value;
        setForm(prev => setForm({...prev, "phases": phasesClone}));
    }

    function handleChangeComponentParams(e, phaseIndex, comIndex, paramIndex){
        let phasesClone=form?.phases;
        phasesClone[phaseIndex].components[comIndex].params[paramIndex][e.target.name]=e.target.value;
        setForm(prev => setForm({...prev, "phases": phasesClone}));
    }

    function handleDelete(){
        if(window.confirm("Are you sure you want to delete this process? This action will be not be reversible.")){
            axios.delete(`${backend_paths.GET_PROCESS_BY_ID}/${process.userid}`)
            .then(res => {
                handleSnackbarOpen("success", "Process deleted succesfuily!");
                navigate("/admin/process")
            })
            .catch(err => handleSnackbarOpen("error", err.msg));
        }
    }

    function handleSave(){
        if(window.confirm("Are you sure you want to make this changes?"))
        axios.put(`${backend_paths.GET_PROCESS_BY_ID}`, form)
            .then(res => {if(res.status==200){
                setEdit(false);
                setRefreshToken(prev=>!prev);
                handleSnackbarOpen("success", "Changes saved succesfuily!");
            }})
            .catch(err =>  handleSnackbarOpen("error", err.msg))
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
    
    if(edit && form === undefined){
        setForm(process)
    }
    return(
        <div className="w-100" style={{textAlign:"left"}}>
           <div className="d-flex flex-row align-items-center justify-content-center m-3">
                {!edit ? 
                <div className="d-flex flex-row align-items-center justify-content-center gap-2">
                    <h2>{process?.name}</h2>
                    {!edit ?
                        hash && process?.verification == "verified" ?
                            <a href={`https://preview.cardanoscan.io/transaction/${hash}`} className="d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faCircleCheck} className="h5 pt-1" title={"Check cardano data"} style={{cursor:"pointer", color:"blue"}} />
                            </a>
                            :
                            process?.verification == "reported" ?
                                <FontAwesomeIcon icon={faCircleXmark} className="h5 pt-1" style={{color:"red"}} />
                                :
                                <></>
                        :<></>
                                        
                    }
                </div> : <input name="name" id="name" className="w-50 text-center" value={form?.name} onChange={ (e)=>{ setForm((previous) => setForm({...previous, "name": e.target.value})) } }></input>}
                
                {edit && <FontAwesomeIcon icon={faSave} className="position-relative start-50 top-0" color="green" size="2x" cursor={"pointer"}  onClick={handleSave}/>}
                {edit &&
                
                <div className="d-flex flex-column ps-2">
                    <div>
                        <input type="radio" onChange={ (e)=>{ setForm((previous) => setForm({...previous, "verification": e.target.value})) }} checked={form?.verification=="verified"} id="check" name="hash_icon" value="verified"/>
                        <label for="check"><FontAwesomeIcon icon={faCircleCheck} className="ps-1" style={{color:"blue"}} /></label>
                    </div>

                    <div>
                        <input type="radio" onChange={ (e)=>{ setForm((previous) => setForm({...previous, "verification": e.target.value})) }} checked={form?.verification=="reported"} id="xmark" name="hash_icon" value="reported"/>
                        <label for="xmark"><FontAwesomeIcon icon={faCircleXmark} className="ps-1" style={{color:"red"}} /></label>
                    </div>
                    
                    <div>
                        <input type="radio" onChange={ (e)=>{ setForm((previous) => setForm({...previous, "verification": e.target.value})) }} checked={form?.verification=="none"} id="noIcon" name="hash_icon" value="none"/>
                        <label for="noIcon" className="ps-1">No icon</label>
                    </div>
                    
                </div>
                }
            </div>
            <div className="position-absolute end-0 top-0 p-4 d-flex flex-row justify-content-center gap-3 m-1">
                <FontAwesomeIcon icon={faEdit} cursor="pointer" onClick={()=> setEdit(prev => !prev)}/>
                <FontAwesomeIcon icon={faTrash} cursor="pointer" onClick={handleDelete}/>

            </div>
            
            <hr/>
           
            <div className="ps-3">
                <div>Owner: <Link to={`/admin/user/${process?.userid}`}> {process?.creator.type=="personal" ? process?.creator.firstname + " " + process?.creator.lastname : process?.creator.name} </Link></div>
                {
                    !edit ? 
                    <>
                        <div>Description: {process?.description || "none"}</div>
                        <p className="card-text">Duration: {process?.start_datetime ? dayjs(process?.start_datetime).format("DD/MM/YYYY") : "TBD"} - {process?.end_datetime ? dayjs(process?.end_datetime).format("DD/MM/YYYY") : "TBD"}</p>
                    </>
                    :
                    <>
                        <div>
                            Description: <input type="area" name="description" id="description" value={form?.description} onChange={ (e)=>{ setForm((previous) => setForm({...previous, "description": e.target.value})) } }></input>
                        </div>
                        <div>
                            Duration: &nbsp;
                                <input type="date" name="start_datetime" id="start_datetime" value={form?.start_datetime} onChange={ (e)=>{ setForm((previous) => setForm({...previous, "start_datetime": e.target.value})) } }></input>
                                -
                                <input type="date" name="end_datetime" id="end_datetime" value={form?.end_datetime} onChange={ (e)=>{ setForm((previous) => setForm({...previous, "end_datetime": e.target.value})) } }></input>
                        </div>
                        {
                            //<FontAwesomeIcon icon={faSave} color="green" size="2x" onClick={handleSave} />
                        }
                        <div className="p-2 d-flex gap-1">
                            <button onClick={handleSave}> Save </button>
                            <button onClick={handleReset}> Reset </button>
                        </div>
                    </>
                    
                }
                
                
            </div>

            <hr/>
            <div className="d-flex flex-row align-items-center gap-1 w-25 ms-3 justify-content-center">
                    <label for="selectIteration" className="me-1" >Choose production bulk: </label>
                    <select id="selectIteration" className="px-1 text-center" value={batchIndex} onChange={(e)=>setBatchIndex(e.target.value)}>
                        {batchList?.map((batch, index) => (
                            <option key={batch.batchid} value={index}>#{batch.batchid}</option>
                        ))}
                    </select>
            </div>
            <section className="d-flex w-100 justify-content-between">
                
                <DropdownList name={"Phases:"} className="p-3 w-50" depth={0}>
                    {phases?.map((phase, index)=> 
                        <DropdownList name={!edit ? phase?.name : `Phase #${index+1}`} className="ps-3" depth={1}>
                            <DropdownList name={"Info:"} className="ps-3" depth={2}>
                                {
                                    !edit ?
                                    
                                    <div className="ps-3">
                                        <div>Description: {phase?.description || "none"}</div>
                                        <p className="card-text">Duration: {phase?.start_datetime ? dayjs(phase?.start_datetime).format("DD/MM/YYYY") : "TBD"} - {phase?.end_datetime ? dayjs(phase?.end_datetime).format("DD/MM/YYYY") : "TBD"}</p>
                                    </div> 
                                    :
                                    <div className="ps-3 d-flex flex-column gap-1">
                                        <div>
                                            Name: <input name="name" id={"name"+phase?.phaseid} value={form?.phases[index]?.name} onChange={ (e)=>handleChangePhases(e, index) }></input>
                                        </div>
                                        <div>
                                            Description: <input type="area" name="description" id={"description"+phase?.phaseid} value={form?.phases[index]?.description} onChange={ (e)=>handleChangePhases(e, index) }></input>
                                        </div>
                                        <div>
                                            Duration: &nbsp;
                                                <input type="date" name="start_datetime" id={"phase_start_datetime"+phase?.phaseid} value={form?.phases[index]?.start_datetime} onChange={ (e)=>handleChangePhases(e, index) }></input>
                                                -
                                                <input type="date" name="end_datetime" id={"end_datetime"+phase?.phaseid} value={form?.phases[index]?.end_datetime} onChange={ (e)=>handleChangePhases(e, index) }></input>
                                        </div>
                                    </div>
                                }
                                
                            </DropdownList>
                            {
                                phase.params?.length > 0 &&
                                <DropdownList name={"Params:"} className="ps-3" depth={2}>
                                    {edit && 
                                    <div style={{textAlign: "center"}} className="w-45 d-flex justify-content-between">
                                        <span className="w-25" > name </span>
                                        <span className="w-25"> unit </span>
                                        <span className="w-25"> min value </span>
                                        <span className="w-25"> max value </span>
                                    </div>
                                    }
                                    {phase?.params?.map((param, paramIndex)=>
                                    <>
                                    {
                                        !edit ? 
                                        <div>
                                            <button style={{backgroundColor: "unset",
                                                border: "unset",
                                                padding: "unset", color: "blue"}} className="ps-3" onClick={()=>handleSetParamTable(param, phase?.name, "")}>
                                                {param?.name + " ["+param?.unit+"]: "+ param?.min_value+"-"+param?.max_value }
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <input name="name" className="w-25" id={"param_name"+param?.parameterId} value={form?.phases[index]?.params[paramIndex]?.name} onChange={ (e)=>handleChangePhaseParams(e, index, paramIndex) }></input>
                                            <input name="unit" className="w-25" id={"param_unit"+param?.parameterId} value={form?.phases[index]?.params[paramIndex]?.unit} onChange={ (e)=>handleChangePhaseParams(e, index, paramIndex) }></input>
                                            <input name="min_value" className="w-25" id={"min_value"+param?.parameterId} value={form?.phases[index]?.params[paramIndex]?.min_value} onChange={ (e)=>handleChangePhaseParams(e, index, paramIndex) }></input>
                                            <input name="max_value" className="w-25" id={"max_value"+param?.parameterId} value={form?.phases[index]?.params[paramIndex]?.max_value} onChange={ (e)=>handleChangePhaseParams(e, index, paramIndex) }></input>         
                                        </div>
                                    }
                                    </>
                                    )}
                                </DropdownList>    
                            }
                            {
                                phase?.components?.length > 0 &&
                                <DropdownList name={"Components:"} className="ps-3" depth={2}>  
                                {phase.components?.map((com, comIndex) => 
                                    <DropdownList name={ !edit ? com?.name  : `Component #${index+1}.${comIndex+1}`} className="ps-3" depth={3}> 
                                        <DropdownList name={"Info:"} className="ps-3" depth={4}>
                                            { !edit ?
                                            
                                            <div className="ps-3">
                                                <div>Description: {com?.description || "none"}</div>
                                                <p className="card-text">Duration: {com.start_datetime ? dayjs(com.start_datetime).format("DD/MM/YYYY") : "TBD"} - {com.end_datetime ? dayjs(com.end_datetime).format("DD/MM/YYYY") : "TBD"}</p>
                                            </div> 
                                            :
                                            <div className="ps-3 d-flex flex-column gap-1">
                                                <div>
                                                    Name: <input name="name" id={"name"+com?.componentid} value={form?.phases[index]?.components[comIndex]?.name} onChange={ (e)=>handleChangeComponent(e, index, comIndex) }></input>
                                                </div>
                                                <div>
                                                    Description: <input type="area" name="description" id={"description"+com?.componentid} value={form?.phases[index]?.components[comIndex]?.description} onChange={ (e)=>handleChangeComponent(e, index, comIndex) }></input>
                                                </div>
                                                {

                                                // <div>
                                                //     Duration: 
                                                //         <input type="date" name="start_datetime" id={"component_start_datetime"+com?.componentid} value={form?.phases[index]?.components[comIndex]?.start_datetime} onChange={ (e)=>handleChangeComponent(e, index, comIndex) }></input>
                                                //         -
                                                //         <input type="date" name="end_datetime" id={"component_datetime"+com?.componentid} value={form?.phases[index]?.components[comIndex]?.end_datetime} onChange={ (e)=>handleChangeComponent(e, index, comIndex) }></input>
                                                // </div>
                                                }
                                            </div>
                                        }
                                        </DropdownList>
                                        {
                                            com.params?.length >0 && 
                                            <DropdownList name={"Params:"} className="ps-3" depth={4}> 
                                                {com.params?.map((param, paramIndex)=>
                                                    <>
                                                        {edit && 
                                                        <div style={{textAlign: "center"}} className="w-45 d-flex justify-content-between">
                                                            <span className="w-25" > name </span>
                                                            <span className="w-25"> unit </span>
                                                            <span className="w-25"> min value </span>
                                                            <span className="w-25"> max value </span>
                                                        </div>
                                                        }
                                                        {
                                                            !edit ?
                                                            
                                                            <button style={{backgroundColor: "unset", border: "unset", padding: "unset", color: 'blue'}} 
                                                                    className="ps-3" 
                                                                    onClick={()=>handleSetParamTable(param, phase?.name, com?.name)}
                                                            >
                                                                {param?.name + " ["+param?.unit+"]: "+ param?.min_value+"-"+param?.max_value }
                                                            </button>
                                                            : 
                                                            <div>
                                                                <input name="name" id={"param_name"+param?.parameterId} value={form?.phases[index]?.components[comIndex]?.params[paramIndex]?.name} onChange={ (e)=>handleChangeComponentParams(e, index, comIndex, paramIndex) }></input>
                                                                <input name="unit" id={"param_unit"+param?.parameterId} value={form?.phases[index]?.components[comIndex]?.params[paramIndex]?.unit} onChange={ (e)=>handleChangeComponentParams(e, index, comIndex, paramIndex) }></input>
                                                                <input name="min_value" id={"min_value"+param?.parameterId} value={form?.phases[index]?.components[comIndex]?.params[paramIndex]?.min_value} onChange={ (e)=>handleChangeComponentParams(e, index, comIndex, paramIndex) }></input>
                                                                <input name="max_value" id={"max_value"+param?.parameterId} value={form?.phases[index]?.components[comIndex]?.params[paramIndex]?.max_value} onChange={ (e)=>handleChangeComponentParams(e, index, comIndex, paramIndex) }></input>         
                                                            </div>
                                                        }
                                                    </>
                                                    )} 
                                            </DropdownList>
                                        }
                                        
                                    </DropdownList>
                                )}
                                </DropdownList>

                            }
                            
                        </DropdownList>
                    )}
                </DropdownList>

                
                { 
                parameter?.parameterid &&
                <div className="m-3 w-50">
                    <div style={{fontSize: '28px'}} >LOGED DATA TABLE: &nbsp;  {parameterOf.phaseName + " / "} {parameterOf.componentName ? parameterOf.componentName + " / ": ""} {parameter?.name}</div> 
                    <div className="px-3">
                        {parameterInfo && parameterInfo?.length === 0 &&
                            <h5 className="text-start p-3">There is no data to show</h5>
                        }
                        {parameterInfo && parameterInfo?.length > 0 &&
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Value</th>
                                        <th scope="col">Unit</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {parameterInfo.map(info => (
                                    <tr key={nanoid()}> 
                                        <th>{info.value}</th>
                                        <th>{info.unit}</th>
                                        <th>{dayjs(info.datetime).format("DD/MM/YYYY")}</th>
                                        <th>{dayjs(info.datetime).format("HH:mm:ss")}</th>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        }

                    </div>
                </div>
                }
                
                
            </section>
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