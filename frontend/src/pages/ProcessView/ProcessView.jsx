import Carousel from "../../components/Carousel/Carousel"
import carousel from "./processView.css"
import PhaseView from "../../components/PhaseView/PhaseView";
import {useEffect, useState} from "react";
import axios from "axios";
import {backend_paths} from "../../constants/paths";

const ProcessView = () => {
    const [process, setProcess] = useState([]);

    useEffect(() => {
        const getProcess = async () => {
            let data = (await axios.get(`${backend_paths.GET_PROCESS_BY_ID}/3`)).data;
            setProcess(data);
        };

        getProcess();
    }, []);



    return (
        <div>
            <h4 className="mx-auto mt-3 h2  text-secondary">{process.name}</h4>

        <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64, minHeight: 300 }}>
            {process.phases && process.phases.length > 0 &&
            <Carousel show={3} numOfPhases={process.phases.length * 2}>

                {process?.phases?.map((phase,index) =>(
                    <PhaseView
                        key={phase.phaseid}
                        phase={phase}
                        num={index + 1}
                    />
                    ))}

                {process?.phases?.map((phase,index) =>(
                    <PhaseView
                        key={phase.phaseid}
                        phase={phase}
                        num={index + 1}
                    />
                ))}
            </Carousel>
        }
        </div>
        </div>
    )
}

export default ProcessView