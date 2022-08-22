import React, { useEffect, useContext } from 'react';
import { UserContext } from "./UserContext";

function Dashboard(props) {

    //get context
    let userContext = useContext(UserContext);
    //    executes only once - on initial render = componentdidmount
    useEffect(() => {
        document.title = "Dashboard - eCommerce";


        console.log(useContext);
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;