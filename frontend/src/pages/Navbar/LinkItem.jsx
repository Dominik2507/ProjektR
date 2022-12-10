import React from "react";
import {Link} from "react-router-dom";


export default function LinkItem({path, linkname,handleClick}) {
    return <li
        className="nav-item me-3 me-lg-0"
        onClick={handleClick}
    >
        <Link to={path} className="nav-link">{linkname}</Link>
    </li>;
}
