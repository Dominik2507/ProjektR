import React, { useState, useEffect, useContext } from "react";

import Carousel from "../../components/Carousel/Carousel";
import PhaseView from "../../components/PhaseView/PhaseView";
import {nanoid} from "nanoid";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import ModalInputPhaseParams from "./ModalInputPhaseParams";
import ModalInputComponentParams from "./ModalInputComponentParams";
import {useParams, useLocation} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./viewOneProcess.css";
import ShowParametersToolbar from "./ShowParametersToolbar";
import ViewDataModal from "./ViewDataModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark, faQrcode} from "@fortawesome/free-solid-svg-icons";
import QRModal from "../../components/QRModal/QRModal";
import QRButton from "../../components/QRModal/QRButton";
import ReportButton from "../../components/ReportModal/ReportButton";
import ReportModal from "../../components/ReportModal/ReportModal"
import Button from "../../components/Form/Button";
import { AuthContext } from "../../context/AuthContext";
import GlassBackground from "../../components/GlassBackgroud";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export default function ViewOneProcess(){
    const { id } = useParams();
    const location=useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [process, setProcess] = useState();
    const [batchList, setBatchList]=useState([]);
    const [batchIndex, setBatchIndex] = useState(queryParams.get('batchIndex') || 0);
    const [carouselLength, setCarouselLength] = useState(process?.phases ? process.phases.length : 0);
    const [modalPhaseOpen, setModalPhaseOpen] = useState(false);
    const [modalComponentOpen, setModalComponentOpen] = useState(false);
    const [modalQROpen, setModalQROpen]= useState(false);
    const [modalReportOpen, setModalReportOpen]= useState(false);
    const [phaseParamSelected, setPhaseParamSelected] = useState(null);
    const [componentSelected,setComponentSelected] = useState(null);
    const [paramId, setParamId] = useState(-1);
    const [phase,setPhase] = useState(null);
    const [hash,setHash] = useState("");
    const [reloadToken, setReloadToken]= useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarType, setSnackbarType] = useState("info");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const {currentUser} = useContext(AuthContext);

    useEffect(() =>  {
        setCarouselLength(process?.phases ? process.phases.length : 0);
    },[process?.phases?.length])

    useEffect(() => {

        if(!id) return;
        axios.get(`${backend_paths.GET_PROCESS_BY_ID}/${id}`)
            .then(res => res.data)
            .then(data => {
                let queryBatchId = queryParams.get('batchIndex');
                console.log(queryBatchId)
                
                let queryBatchIndex = data.findIndex((batch)=>batch.batchid==queryBatchId)
                console.log(queryBatchIndex)
                console.log("process", data, data.length)
                if(queryBatchId != null && queryBatchId == -1){
                    //notify user over wrong
                }
                let batID = queryBatchIndex && queryBatchIndex >=0 ? queryBatchIndex : (data.length-1);
                setBatchList(data);
                setBatchIndex(batID);
                setProcess(data[batID])
            })
            .catch(err => console.log(err));

        axios.get(`${backend_paths.HASH}/${id}`)
            .then(res => res.data)
            .then(data => {
                console.log("hash",data)
                setHash(data.transactionid)
            })
            .catch(err => console.log(err));

        
    }, [reloadToken])

    useEffect(()=>{
        console.log("Setting process", batchIndex, batchList, batchList[batchIndex])
        if(batchIndex >= batchList.length || batchIndex < 0){
            setProcess(batchList[batchList.length-1]);    
        }else{
            setProcess(batchList[batchIndex]);
        }
    }, [batchIndex])
   

    const handleOpenPhaseModal = (paramid) => {
        if(!paramid) return;

        const param = process?.params.filter(parameters => parameters.parameterid === paramid);

        if(param?.length === 0) return;

        setPhaseParamSelected(param[0]);
        setModalPhaseOpen(true);
    }
    
    const handleOpenComponentModal = (component,index) => {
        setComponentSelected(component);
        setModalComponentOpen(true);
    }

    const handleOpenQRModal = () => {
        setModalQROpen(true);
    }

    const handleOpenReportModal = () => {
        setModalReportOpen(true);
    }

    const handleCloseModal = () => {
        setModalPhaseOpen(false);
        setPhaseParamSelected(null);
    }

    const handleCloseComponentModal = () => {
        setComponentSelected(null);
        setModalComponentOpen(false);
    }

    const handleCloseQRModal = () => {
        setModalQROpen(false);
    }

    const handleCloseReportModal = () => {
        setModalReportOpen(false);
    }
    
    const handleStartBulk = () =>{
        if(!window.confirm("Are you sure you want to add a new batch?")) return; 
        const phaseid_list = process.phases.map(phase=>phase.phaseid); 
        let data={
            processid: id,
            phaseid_list: phaseid_list
        }
        axios.post(`${backend_paths.START_NEW_BULK}`, data)
            .then(res => res.data)
            .then(data => {
                setReloadToken(prev => !prev);
            })
            .catch(err => console.log(err)); 
    }

    function handleOpenSnackbar(type, msg){
        setSnackbarMessage(msg);
        setSnackbarType(type); 
        setSnackbarOpen(true);
    }

    return(
        <React.Fragment>
            

            {paramId >= 0 &&
            <>
                <GlassBackground/>
                <ViewDataModal handleClose={() => setParamId(-1)} batchid={process.batchid} paramId={paramId} />
            </>
            }
            {modalPhaseOpen && phaseParamSelected &&
            <>
                <GlassBackground/>
                <ModalInputPhaseParams openSnackbar={handleOpenSnackbar} closeModal={handleCloseModal} param={phaseParamSelected} batchid={process.batchid}/>
            </>
            }
            {modalComponentOpen && componentSelected &&
            <>
                <GlassBackground/>
                <ModalInputComponentParams openSnackbar={handleOpenSnackbar} handleClose={handleCloseComponentModal} component={componentSelected} batchid={process.batchid}/>
            </>
            }
            {
                modalQROpen && 
                <>
                    <GlassBackground/>
                    <QRModal batchIndex={batchIndex} handleClose={handleCloseQRModal}></QRModal>
                </>
            }
            {
                modalReportOpen && 
                <>
                    <GlassBackground/>
                    <ReportModal openSnackbar={handleOpenSnackbar} processid={id} reportedBy={currentUser?.userid} handleClose={handleCloseReportModal}/>
                </>
            }

            <div className={phase ? "grid-one-process w-100" : "w-100 mt-5"}>
                
                {process &&
                    <div className="process-wrapper w-100 d-flex flex-column justify-content-center align-items-center">
                            <div className="d-flex flex-row  justify-content-start w-100 mb-3 gap-3">
                                <div className="d-flex flex-row align-items-center gap-1 w-25 justify-content-center">
                                    <label for="selectIteration" className="me-1" >Choose production bulk: </label>
                                    <select id="selectIteration" className="px-1 text-center" defaultValue={batchIndex} onChange={(e)=>setBatchIndex(e.target.value)}>
                                        {batchList?.map((batch, index) => (
                                            <option key={batch.batchid} value={index}>#{batch.batchid}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-center gap-2 w-50">
                                    <h2>{process.name}</h2>
                                    {hash !== "" && process?.verification == "verified" ?
                                        <a href={`https://preview.cardanoscan.io/transaction/${hash}`} className="d-flex align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faCircleCheck} title={"Click to view cardano data"} className="h5 pt-1"  style={{cursor:"pointer", color:"blue"}} />
                                        </a>
                                        :
                                        process?.verification == "reported" ?
                                        <FontAwesomeIcon icon={faCircleXmark} title="Some inconsistencies have been found with this process" className="h5 pt-1" style={{color:"red"}} />:
                                        <></>
                                    }
                                </div>
                                
                                <div>
                                    {!phase && <QRButton handleOpen={handleOpenQRModal}/> }
                                    {!phase && <ReportButton handleOpen={handleOpenReportModal}/> }
                                </div>
                            </div>
                        <div className="process-view">
                            <Carousel show={3} numOfPhases={carouselLength} handleSave={() => {
                            }}>
                                {process.phases?.map((phase, index) => (
                                    <PhaseView
                                        batchId={process.batchid}
                                        activePhaseId={process.activephaseid}
                                        key={nanoid()}
                                        inputParamVisible={true}
                                        addParamVisible = {false}
                                        phase={phase}
                                        params={phase.params}
                                        openPhaseModal={handleOpenPhaseModal}
                                        handleComponent={handleOpenComponentModal}
                                        index={index}
                                        length={process.phases?.length}
                                        nextPhase={ index < (process.phases?.length-1) ? process.phases[index+1] : null}
                                        processid={process.processid}
                                        componentBtnName="Add logs"
                                        canView={true} 
                                        handleShowParameters={() => setPhase(phase)}
                                        ownerid={process?.userid}
                                    />
                                ))}
                            </Carousel>
                            
                        </div>
                    </div>
                }
                {currentUser?.userid == process?.userid && !phase &&
                    <div className="d-flex justify-content-end m-3">
                        <button className="btn btn-info text-white m-3" onClick={handleStartBulk}> Start new bulk </button>
                    </div>
                }
                {phase &&
                    <Sidebar>
                        <ShowParametersToolbar phase={phase} setParamId={setParamId} closeToolbar={() => setPhase(null)} />
                    </Sidebar>
                }
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={()=>setSnackbarOpen(false)}
                >
                    <MuiAlert elevation={6} onClose={()=>setSnackbarOpen(false)} variant="filled" severity={snackbarType} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        </React.Fragment>
    )
}