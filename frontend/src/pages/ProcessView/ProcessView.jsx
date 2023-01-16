import Carousel from "../../components/Carousel/Carousel"
import carousel from "./processView.css"
import PhaseView from "../../components/PhaseView/PhaseView";
import {useState} from "react";

const ProcessView = () => {
    const [phases, setPhases] = useState();


    return (
        <div>
            <h4 className="mx-auto mt-3 h2  text-secondary">Process name</h4>

        <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64, minHeight: 300 }}>
            <Carousel show={3}>
                <PhaseView />
                <PhaseView />
                <PhaseView />
                <PhaseView />
            </Carousel>
        </div>
        </div>
    )
}

export default ProcessView