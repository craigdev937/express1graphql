import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Project } from "../pages/Project";

export const Main = () => (
    <BrowserRouter>
        <React.Fragment>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </React.Fragment>
    </BrowserRouter>
);


