import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook,faInstagram,faTwitter} from "@fortawesome/free-brands-svg-icons";

export default function Footer(){
    return(
        <footer
            className="text-center text-lg-start text-white"
            style={{
                backgroundColor : "#45526e"
            }}
        >

            <div className="container p-4 pb-0">

                    <section className="p-3 pt-0">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-7 col-lg-8 text-center text-md-start">
                                <div>
                                    © 2022 Copyright:Tim 2
                                </div>

                            </div>
                            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end d-flex">

                                <a
                                    className="text-white btn btn-outline-light btn-floating m-1"
                                    role="button"
                                    href="https://www.facebook.com/"
                                >
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>

                                <a
                                    className="text-white btn btn-outline-light btn-floating m-1"
                                    role="button"
                                    href="https://www.twitter.com/"
                                >
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>

                                <a
                                    className="text-white btn btn-outline-light btn-floating m-1"
                                    role="button"
                                    href="https://www.instagram.com/"
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>

                        </div>
                    </section>

            </div>

        </footer>
    );
}