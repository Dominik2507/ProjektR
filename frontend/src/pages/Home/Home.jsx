import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./homepage.css"

export default function Home(){
    const {currentUser}= useContext(AuthContext);
    const navigate= useNavigate();
    
    useEffect(()=>{
        if(currentUser?.type==="admin"){
            navigate("/admin")
        }
    })
    return(
        <div className="grid-container">
            <div className="grid-item"> 
                <b>Who are we?</b>  <br></br>
                We are a group of students at University of Zagreb, Faculty of Electrical Engineering and Computing. 
                This is a project we are doing as a part of our curriculum.
            </div>
            <div className="grid-item"> 
                <b>What are we here for?</b>  <br></br>
                This page offers creation and overview of product production process tracking. 
                The idea is to create an open platform using blockchain technology where anyone 
                has access to the more accurate and confirmable data about each phase of production of any product.
            </div>
            <div className="grid-item"> 
                <b>Why blockchain?</b>  <br></br>
                Blockchain stores data at multiple locations, so once information is pushed, 
                it is impossible to change it after. That gives information from our page credibilty.
            </div>
            <img className="image" src="pic1.jpg" alt="React Image" />
            <div className="grid-item">
                <b>Blockchain and Cardano</b>  <br></br>
                Cardano is an open source proof-of-stake blockchain project that aims to provide a more secure 
                and sustainable ecosystem for the development and execution of smart contracts and decentralized applications.
                For more information click <a href="https://onedrive.live.com/view.aspx?resid=73C7A6D203C44D65!2261&ithint=file%2cdocx&authkey=!AMNHbONyLclc7G8">
                here
                </a>
            </div>
            <img className="image" src="pic2.jpg" alt="React Image" />
</div>
    )
}