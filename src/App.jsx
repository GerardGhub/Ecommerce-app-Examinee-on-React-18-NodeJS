import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import { HashRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";


function App() {

    let [user, setUser] = useState({
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
            <HashRouter>
                <div className="container-fluid">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<NoMatchPage />} />
                    </Routes>
                </div>
            </HashRouter>
        </UserContext.Provider>
    );
}

export default App;

