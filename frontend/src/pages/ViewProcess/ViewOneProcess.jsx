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

export default function ViewOneProcess(){
    const { id } = useParams();
    const [process, setProcess] = useState();
    const [carouselLength, setCarouselLength] = useState(process?.phases ? process.phases.length : 0);
    const [modalPhaseOpen, setModalPhaseOpen] = useState(false);
    const [modalComponentOpen, setModalComponentOpen] = useState(false);
    const [paramId, setParamId] = useState(-1);
    const [phaseParamSelected, setPhaseParamSelected] = useState(null);
    const [componentSelected,setComponentSelected] = useState(null);
    const [phase, setPhase] = useState(null);


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
            .catch(err => console.log(err))
    }, [])


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

    console.log(paramId);

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

        <div className={phase ? "grid-one-process w-100" : "mt-5 w-100"}>
            {phase &&
                <Sidebar>
                    <ShowParametersToolbar closeToolbar={() => setPhase(null)} phase={phase} setParamId={setParamId} />
                </Sidebar>
            }
            {process &&
                <div className="process-wrapper w-100 d-flex justify-content-center align-items-center">
                    <div className="process-view">
                        <Carousel show={3} numOfPhases={carouselLength} handleSave={() => {
                        }}>
                            {process.phases.map((phase, index) => (
                                <PhaseView
                                    key={nanoid()}
                                    inputParamVisible={true}
                                    addParamVisible = {false}
                                    phase={phase}
                                    params={phase.params}
                                    openPhaseModal={handleOpenPhaseModal}
                                    handleComponent={handleOpenComponentModal}
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