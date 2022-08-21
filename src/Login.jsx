import React, { useState, useEffect } from "react";

let Login = () => {
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");

    // executes on each render (initial render & state updates)
    useEffect(() => {

        // console.log(email, password);
    });


    // executes only on state updates of "email" only and also with the initial render
    useEffect(() => {
        // validation on email only
        if (email.indexOf("@") > 0) {
            // console.log("valid");
        } else {
            // console.log("invalid");
        }

    }, [email])


    //    executes only once - on initial render = componentdidmount
    useEffect(() => {
        document.title ="Login - eCommerce";
    }, []);

    // executes only once on component unmounting phase = componentWillUnmount
    useEffect(() => {
        //do something
        return () => {
            console.log("Component Unmount");
        };
    });


    return (
        <div className="row">
            <div className="col-lg-5 col-md-7 mx-auto">
                <div className="card border-success shadow-lg my-2">
                    <div className="card-header border-bottom border-success">
                        <h4 style={{ fontSize: "40px" }} className="text-success
                        text-center">Login</h4>
                    </div>
                    <div className="card-body border-bottom border-success">
                        {/* email start */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value); }}
                                placeholder="Email">
                            </input>
                        </div>
                        {/* email ends */}

                        {/* password start */}
                        <div className="form-group">
                            <label htmlFor="passwordl">Password</label>
                            <input type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value); }}
                                placeholder="Password">
                            </input>
                        </div>
                        {/* password ends */}
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Login;

