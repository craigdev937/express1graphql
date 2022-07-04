import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Project } from "../pages/Project";

export const Main = () => (
    <BrowserRouter>
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </React.Fragment>
    </BrowserRouter>
);


