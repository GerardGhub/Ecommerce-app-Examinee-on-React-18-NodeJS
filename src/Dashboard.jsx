import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "./UserContext";
import Order from "./Order";


//getPreviousOder
let getPreviousOrders = (Orders) => {
    return Orders.filter((ord) => ord.isPaymentCompleted == true);
}

//getCart
let getCart = (Orders) => {
    return Orders.filter((ord) => ord.isPaymentCompleted == false);
}

function Dashboard(props) {
    let [orders, setOrders] = useState([]);

    //get context
    let userContext = useContext(UserContext);
    // console.log(useContext);

    // executes only once - on initial render = componentdidmount
    useEffect(() => {
        document.title = "Dashboard - eCommerce";

        //load data from database
        (async () => {
            let ordersResponse = await fetch(`http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
                { method: "GET" }
            );
            if (ordersResponse.ok) {
                //if status 200
                let ordersResponseBody = await ordersResponse.json();

                //get data from products
                let productResponse = await fetch("http://localhost:5000/products", {
                    method: "GET",
                });
                if (productResponse.ok) {
                    let productsResponseBody = await productResponse.json();

                    //read all orders data
                    ordersResponseBody.forEach((order) => {
                        order.product = productsResponseBody.find((prod) => prod.id === order.productId);
                    });

                console.log(ordersResponseBody);
                    setOrders(ordersResponseBody);
                }



            }

        })(

        );
    }, [userContext.user.currentUserId]);



    return (
        <div className='row'>
            <div className="col-12 py-3 header">
                <h4>
                    <i className="fa fa-dashboard"></i>Dashboard</h4>
            </div>


            <div className="col-12">
                <div className="row">
                    {/* Previos Order */}
                    <div className="col-lg-6">
                        <h4 className='py-2 my-2 text-info border-bottom border-info '>
                            <i className="fa fa-history"></i> Previos Orders{" "}
                            <span className="badge badge-info">{getPreviousOrders(orders).length}</span>
                        </h4>
                        {getPreviousOrders(orders).length === 0 ? (<div
                            className="text-danger"> No Orders </div>) : (
                            ""
                        )}

                        {getPreviousOrders(orders).map((ord) => {
                            return <Order
                                key={ord.id}
                                orderId={ord.id}
                                productId={ord.productId}
                                userId={ord.userId}
                                isPaymentCompleted={ord.isPaymentCompleted}
                                quantity={ord.quantity}
                                productName={ord.product.productName}
                                price={ord.product.price}
                            />;
                        })}
                    </div>
                    {/* End of Previos Order */}

                    {/* Start Cart */}
                    <div className="col-lg-6">
                        <h4 className='py-2 my-2 text-primary border-bottom border-primary '>
                            <i className="fa fa-shopping-cart"></i> Cart{" "}
                            <span className="badge badge-primary">{getCart(orders).length}</span>
                        </h4>
                        {getCart(orders).length === 0 ? (<div
                            className="text-danger"> No products in your cart </div>) : (
                            ""
                        )}

                        {getCart(orders).map((ord) => {
                            return <Order
                                key={ord.id}
                                orderId={ord.id}
                                productId={ord.productId}
                                userId={ord.userId}
                                isPaymentCompleted={ord.isPaymentCompleted}
                                quantity={ord.quantity}
                                productName={ord.product.productName}
                                price={ord.product.price}
                            />;
                        })}
                    </div>
                    {/* End of Cart */}
                </div>
            </div>

        </div>
    );
}

export default Dashboard;