import React from "react";

const Footer = () => {
    return (
        <div>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top " style={{marginTop:"150px"}}>
                <div className="social-icon col-md-4 d-flex align-items-center">
                    <span className="mb-3 mb-md-0 text-muted" style={{ fontFamily: "Poppins", fontSize: "15px", marginLeft: "7px" }}>By Vinay Thapa © 2023 </span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex social-bar">
                    <a href="https://www.linkedin.com/in/vinay-singh-thapa" target="_blank"  rel="noreferrer" ><i className="fa fa-linkedin" style={{color:"blue"}}></i></a>
                    <a href="https://www.instagram.com/thapa._.vinay" target="_blank"  rel="noreferrer" ><i className="fa fa-instagram" style={{color:"red"}}></i></a>
                    <a href="https://github.com/ThapaVinay" target="_blank"  rel="noreferrer" ><i className="fa fa-github"></i></a>
                </ul>
            </footer>
        </div>
    );
}
export default Footer;