import React from 'react'
import logo from './logo.png'

export default function About() {
    return (
        <div className='container ' style={{ marginTop: "30px", marginBottom: "50px", textAlign: "center" }}>
            <img src={logo} class="rounded newslogo" alt="..." style={{marginBottom:"20px",  border: "1px solid #555"}} />
            <div className="mb-3 mb-md-0 text-muted" style={{ fontFamily: "Poppins", fontSize: "25px", marginLeft: "7px" }} ><h2> <strong>Vinay Singh Thapa</strong></h2></div>
            <div className="mb-3 mb-md-0 text-muted" style={{ fontFamily: "Poppins", fontSize: "23px", marginLeft: "7px" }}><span>Currently pursuing Btech from UPES, Dehradun &#123; 2021 - 25 &#125;</span></div>
            <div className="mb-3 mb-md-0 text-muted" style={{ fontFamily: "Poppins", fontSize: "20px", marginLeft: "7px", marginTop: "10px" }}><span>Email : thechampthapa@gmail.com</span></div>

            <div className='container' style = {{marginTop : "10px" }}>
                <ul className="nav col-md-4 justify-content-center list-unstyled d-flex " style = {{ margin : "auto"}}>
                    <a href="https://www.linkedin.com/in/vinay-singh-thapa" target="_blank" rel="noreferrer" style = {{color: 'blue',fontSize: '50px',padding: '20px'}}><i className="fa fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/thapa._.vinay" target="_blank" rel="noreferrer" style = {{color: 'red',fontSize: '50px',padding: '20px'}} ><i className="fa fa-instagram"></i></a>
                    <a href="https://github.com/ThapaVinay" target="_blank" rel="noreferrer" style = {{color: 'black',fontSize: '50px',padding: '20px'}}><i className="fa fa-github"></i></a>
                </ul>
            </div>

        </div>
    )
}