import React from "react";
import { Outlet, Link } from "react-router-dom";


export default function Layout(){
    return(       
        <div className="d-flex flex-column min-vh-100">
            <nav className="navbar navbar-expand-lg bg-dark-subtle">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">React Routing</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-item nav-link" to="Services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="contact">Contact</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <div className="container p-3">

            </div>
            <Outlet/>
            <footer className="text-center mt-auto">
                <p>Copyright©️ All Right Reserve, Mark S. Santos</p>
            </footer>
            </div>
    )
};