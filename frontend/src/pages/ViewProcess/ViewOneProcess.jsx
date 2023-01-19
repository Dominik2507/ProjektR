import React, { useState, useEffect } from "react";

import Carousel from "../../components/Carousel/Carousel";
import PhaseView from "../../components/PhaseView/PhaseView";
import {nanoid} from "nanoid";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import ModalInputPhaseParams from "./ModalInputPhaseParams";
import ModalInputComponentParams from "./ModalInputComponentParams";
import {useParams} from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import "./viewOneProcess.css";
import ShowParametersToolbar from "./ShowParametersToolbar";
import ViewDataModal from "./ViewDataModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";

export default function ViewOneProcess(){
    const { id } = useParams();
    const [process, setProcess] = useState();
    const [carouselLength, setCarouselLength] = useState(process?.phases ? process.phases.length : 0);
    const [modalPhaseOpen, setModalPhaseOpen] = useState(false);
    const [modalComponentOpen, setModalComponentOpen] = useState(false);
    const [phaseParamSelected, setPhaseParamSelected] = useState(null);
    const [componentSelected,setComponentSelected] = useState(null);
    const [paramId, setParamId] = useState(-1);
    const [phase,setPhase] = useState(null);
    const [hash,setHash] = useState();

    useEffect(() =>  {
        setCarouselLength(process?.phases ? process.phases.length : 0);
    },[process?.phases?.length])

    useEffect(() => {

        if(!id) return;
        axios.get(`${backend_paths.GET_PROCESS_BY_ID}/${id}`)
            .then(res => res.data)
            .then(data => {
                setProcess(data);
            })
            .catch(err => console.log(err));

        axios.get(`${backend_paths.HASH}/${id}`)
            .then(res => res.data)
            .then(data => setHash(data))
            .catch(err => console.log(err));
    }, [])

    console.log(hash);

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

    const handleCloseModal = () => {
        setModalPhaseOpen(false);
        setPhaseParamSelected(null);
    }

    const handleCloseComponentModal = () => {
        setComponentSelected(null);
        setModalComponentOpen(false);
    }


    return(
        <React.Fragment>
            {paramId >= 0 &&
                <ViewDataModal handleClose={() => setParamId(-1)} paramId={paramId} />
            }
            {modalPhaseOpen && phaseParamSelected &&
                <ModalInputPhaseParams closeModal={handleCloseModal} param={phaseParamSelected}/>
            }
            {modalComponentOpen && componentSelected &&
                <ModalInputComponentParams handleClose={handleCloseComponentModal} component={componentSelected}/>
            }

            <div className={phase ? "grid-one-process w-100" : "w-100 mt-5"}>
                {phase &&
                    <Sidebar>
                        <ShowParametersToolbar phase={phase} setParamId={setParamId} closeToolbar={() => setPhase(null)} />
                    </Sidebar>
                }


            {process &&
                <div className="process-wrapper w-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <h2>{process.name}</h2>
                            {hash &&
                            <a href={`https://preview.cardanoscan.io/transaction/${hash}`} className="d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faCircleCheck} className="h5 ms-1" style={{cursor:"pointer", color:"blue"}} />
                            </a>
                            }
                        </div>
                    <div className="process-view">
                        <Carousel show={3} numOfPhases={carouselLength} handleSave={() => {
                        }}>
                            {process.phases?.map((phase, index) => (
                                <PhaseView
                                    key={nanoid()}
                                    inputParamVisible={true}
                                    addParamVisible = {false}
                                    phase={phase}
                                    params={phase.params}
                                    openPhaseModal={handleOpenPhaseModal}
                                    handleComponent={handleOpenComponentModal}
                                    index={index}
                                    length={process.phases.length}
                                    nextPhase={ index < (process.phases.length-1) ? process.phases[index+1] : null}
                                    processid={process.processid}
                                    componentBtnName="Add logs"
                                    canView={true}
                                    handleShowParameters={() => setPhase(phase)}
                                />
                            ))}
                        </Carousel>
                    </div>
                </div>
            }
            </div>
        </React.Fragment>
    )
}