import React from "react";
import "./homepage.css"

export default function Home(){
    return(
        <div className="grid-container">
            <div className="grid-item">
                <b>Who are we?</b>  <br></br>
                We are a group of students at University of Zagreb, Faculty of Electrical Engineering and Computing. 
                This is a project we are doing as a part of our curiculum.
            </div>
            <div className="grid-item">
                <b>What are we here for?</b>  <br></br>
                This page offers creation and overview of product production process tracking. 
                The idea is creating an open platform using blockchain technology where anyone 
                can acces more accurate and confirmable data about each phase of production of any product.
            </div>
            <div className="grid-item">
                <b>Why blockchain?</b>  <br></br>
                Blockchain stores data at multiple locations, so once information is pushed, 
                it is impossible to change it after. That gives information from our page credibilty.
            </div>
            <img className="image" src="https://bernardmarr.com/img/What%20Is%20Blockchain%20A%20Super%20Simple%20Guide%20Anyone%20Can%20Understand.png" alt="React Image" />
            <div className="grid-item">
                <b>More about this...</b>  <br></br>
                link
            </div>
            <img className="image" src="https://imageio.forbes.com/specials-images/imageserve/5f2a32ee3b52675a453e2881/Fascinating-Examples-Of-How-Blockchain-Is-Used-In-Insurance--Banking-And-Travel/960x0.jpg?format=jpg&width=960" alt="React Image" />
</div>
    )
}