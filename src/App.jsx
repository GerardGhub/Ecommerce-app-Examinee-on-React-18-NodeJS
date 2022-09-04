import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import ProductsList from "./ProductsList";
import { HashRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";
import Store from "./Store";

function App() {

    let [user, setUser] = useState({
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
        currentUserRole: null,
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
                        <Route path="/store" element={<Store />} />
                        <Route path="/products" element={<ProductsList />} />
                        <Route path="*" element={<NoMatchPage />} />
                    </Routes>
                </div>
            </HashRouter>
        </UserContext.Provider>
    );
}

export default App;

