import React from "react";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import { HashRouter, Routes } from "react-router-dom";
import { Route } from "react-router";

function App() {
    return (
        <HashRouter>
            <div className="container-fluid">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NoMatchPage />} />
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;

