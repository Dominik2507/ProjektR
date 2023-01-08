import Carousel from "../../components/Carousel/Carousel"
import carousel from "./processView.css"

const ProcessView = () => {
    return (
        <div>
            <div>
                <h4 style={{color: "rgb(58, 56, 73)"}}>Process name</h4>
            </div>
        <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64, minHeight: 300 }}>
            <Carousel 
                show={3}
            >
                <div className={`phase-container active-${1}`} style={{minHeight: 300}}>
                    <div style={{padding: 8}}>
                        <div style={{minHeight: 50, color: "rgb(58, 56, 73)"}}>
                            <b>Phase 1</b>
                        </div>
                        <div class="podaci-container" style={{minHeight: 200}}>
                            <br></br><span>start date: </span><br></br>
                            <span>end date: </span><br></br>
                            <span>description: </span>
                        </div>
                    </div>
                </div>
                <div className={`phase-container active-${0}`} style={{minHeight: 300}}>
                    <div style={{padding: 8}}>
                        <div style={{minHeight: 50, color: "rgb(58, 56, 73)"}}>
                            <b>Phase 2</b>
                        </div>
                        <div class="podaci-container" style={{minHeight: 200}}>
                            <br></br><span>start date: </span><br></br>
                            <span>end date: </span><br></br>
                            <span>description: </span>
                        </div>
                    </div>
                </div>
                <div className={`phase-container active-${0}`} style={{minHeight: 300}}>
                    <div style={{padding: 8}}>
                        <div style={{minHeight: 50, color: "rgb(58, 56, 73)"}}>
                            <b>Phase 3</b>
                        </div>
                        <div class="podaci-container" style={{minHeight: 200}}>
                            <br></br><span>start date: </span><br></br>
                            <span>end date: </span><br></br>
                            <span>description: </span>
                        </div>
                    </div>
                </div>
                <div className={`phase-container active-${0}`} style={{minHeight: 300}}>
                    <div style={{padding: 8}}>
                        <div style={{minHeight: 50, color: "rgb(58, 56, 73)"}}>
                            <b>Phase 4</b>
                        </div>
                        <div class="podaci-container" style={{minHeight: 200}}>
                            <br></br><span>start date: </span><br></br>
                            <span>end date: </span><br></br>
                            <span>description: </span>
                        </div>
                    </div>
                </div>
                <div className={`phase-container active-${0}`} style={{minHeight: 300}}>
                    <div style={{padding: 8}}>
                        <div style={{minHeight: 50, color: "rgb(58, 56, 73)"}}>
                            <b>Phase 5</b>
                        </div>
                        <div class="podaci-container" style={{minHeight: 200}}>
                            <br></br><span>start date: </span><br></br>
                            <span>end date: </span><br></br>
                            <span>description: </span>
                        </div>
                    </div>
                </div>
                <div className={`phase-container active-${0}`} style={{minHeight: 300}}>
                    <div style={{padding: 8}}>
                        <div style={{minHeight: 50, color: "rgb(58, 56, 73)"}}>
                            <b>Phase 6</b>
                        </div>
                        <div class="podaci-container" style={{minHeight: 200}}>
                            <br></br><span>start date: </span><br></br>
                            <span>end date: </span><br></br>
                            <span>description: </span>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
        </div>
    )
}

export default ProcessView