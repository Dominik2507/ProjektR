import React from "react";
import Paragraph from "../../components/Paragraph";

export default function Home(){
    let paragraphCounter=0;
    return(
        <div className="d-flex flex-column justify-content-evenly text-start w-100 h-100 ">
            <Paragraph title={"Who are we?"} src={"who"} number={paragraphCounter++}></Paragraph>
            <Paragraph title={"What do we offer?"} src={"what"} number={paragraphCounter++}></Paragraph>
            <Paragraph title={"Why blockchain?"} src={"why"} number={paragraphCounter++}></Paragraph>
            <Paragraph title={"What is blockchain?"} src={"blockchain"} number={paragraphCounter++}></Paragraph>
        </div>
    )
}