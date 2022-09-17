import React, { useReducer } from "react";
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


let initialUser = {
    isLoggedIn: false,
    currentUserId: null,
    currentUserName: null,
    currentUserRole: null,
};

//reducer: operations on "user" state
let reducer = (state, action) => {
    // console.log(state, action);
    switch (action.type) {
        case "login":
            return {
                isLoggedIn: true,
                currentUserId: action.payload.currentUserId,
                currentUserName: action.payload.currentUserName,
                currentUserRole: action.payload.currentUserRole,
            };
        case "logout":
            return {
                isLoggedIn: false,
                currentUserId: null,
                currentUserName: null,
                currentUserRole: null,
            };
        default:
            return state;
    }
};

function App() {
    //useReducer: state + operations
    let [user, dispatch] = useReducer(reducer, initialUser);

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            <HashRouter>
                <NavBar />
                <div className="container-fluid">
                    <Routes>
                        <Route path="/" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/dashboard" element={<Dashboard/>} />
                        <Route path="/store" element={<Store/>} />
                        <Route path="/products" element={<ProductsList/>} />
                        <Route path="*" element={<NoMatchPage />} />
                    </Routes>
                </div>
            </HashRouter>
        </UserContext.Provider>
    );
}

export default App;

