import React from "react";
import logo from "../img/logo.png";

export const Header = () => (
    <nav className="navbar bg-light mb-4 p-0">
        <section className="container">
            <a href="/" className="navbar-brand">
                <aside className="d-flex">
                    <img src={logo} alt="" className="mr-2" />
                    <div>ProjectMgmt</div>
                </aside>
            </a>
        </section>
    </nav>
);

