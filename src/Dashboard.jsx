import React, { useEffect, useContext, useState, useCallback } from 'react';
import { UserContext } from "./UserContext";
import Order from "./Order";
import { OrdersService, ProductsService } from "./Service";



function Dashboard(props) {
    let [orders, setOrders] = useState([]);
    let [showOrderDeletedAlert, setShowOrderDeletedAlert] = useState(false);
    let [showOrderPlacedAlert, setShowOrderPlacedAlert] = useState(false);

    //get context
    let userContext = useContext(UserContext);

    let loadDataFromDatabase = useCallback(async () => {
        let ordersResponse = await fetch(`http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
            { method: "GET" }
        );
        if (ordersResponse.ok) {
            //if status 200
            let ordersResponseBody = await ordersResponse.json();

            //get all data from products
            let productResponse = await ProductsService.fetchProducts();
            if (productResponse.ok) {
                let productsResponseBody = await productResponse.json();

                //read all orders data
                ordersResponseBody.forEach((order) => {
                    order.product = ProductsService.getProductByProductId(
                        productsResponseBody, order.productId
                    );
                });

                console.log(ordersResponseBody);
                setOrders(ordersResponseBody);
            }
        }

    }, [userContext.user.currentUserId]);

    // executes only once - on initial render = componentdidmount
    useEffect(() => {
        document.title = "Dashboard - eCommerce";

        loadDataFromDatabase();
    }, [userContext.user.currentUserId, loadDataFromDatabase]);


    //Buy now 
    let onBuyNowClick = useCallback(
        async (orderId, userId, productId, quantity) => {
            if (window.confirm("Do you want to place order for this product")) {
                let updateOrder = {
                    id: orderId,
                    productId: productId,
                    userId: userId,
                    quantity: quantity,
                    isPaymentCompleted: true,
                };

                let orderResponse = await fetch(
                    `http://localhost:5000/orders/${orderId}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(updateOrder),
                        headers: { "Content-type": "application/json" },
                    }
                );

                let orderResponseBody = await orderResponse.json();
                if (orderResponse.ok) {
                    console.log(orderResponseBody);
                    loadDataFromDatabase();
                    setShowOrderPlacedAlert(true);
                }

            }
        }, [loadDataFromDatabase]
    );

    //Delete Functionality
    let onDeleteClick = useCallback(async (orderId) => {

        if (window.confirm("Are you sure to delete this item from cart?")) {
            let orderResponse = await fetch(`http://localhost:5000/orders/${orderId}`,
                {
                    method: "DELETE",
                }
            );
            if (orderResponse.ok) {
                let orderResponseBody = await orderResponse.json();
                console.log(orderResponseBody);

                loadDataFromDatabase();
                setShowOrderDeletedAlert(true);
            }
        }

    }, [loadDataFromDatabase]);


    return (
        <div className='row'>
            <div className="col-12 py-3 header">
                <h4>
                    <i className="fa fa-dashboard"></i>Dashboard {""}
                    <button className="btn btn-sm btn-info"><i className="fa fa-refresh"
                        onClick={loadDataFromDatabase}></i> Refresh</button>
                </h4>
            </div>


            <div className="col-12">
                <div className="row">
                    {/* Previos Order */}
                    <div className="col-lg-6">
                        <h4 className='py-2 my-2 text-info border-bottom border-info '>
                            <i className="fa fa-history"></i> Previos Orders{" "}
                            <span className="badge badge-info">
                                {OrdersService.getPreviousOrders(orders).length}</span>
                        </h4>
                        {OrdersService.getPreviousOrders(orders).length === 0 ? (<div
                            className="text-danger"> No Orders </div>) : (
                            ""
                        )}

                        {OrdersService.getPreviousOrders(orders).map((ord) => {
                            return <Order
                                key={ord.id}
                                orderId={ord.id}
                                productId={ord.productId}
                                userId={ord.userId}
                                isPaymentCompleted={ord.isPaymentCompleted}
                                quantity={ord.quantity}
                                productName={ord.product.productName}
                                price={ord.product.price}
                                onBuyNowClick={onBuyNowClick}
                                onDeleteClick={onDeleteClick}
                            />;
                        })}
                    </div>
                    {/* End of Previos Order */}

                    {/* Start Cart */}
                    <div className="col-lg-6">
                        <h4 className='py-2 my-2 text-primary border-bottom border-primary '>
                            <i className="fa fa-shopping-cart"></i> Cart{" "}
                            <span className="badge badge-primary">{OrdersService.getCart(orders).length}</span>
                        </h4>


                        {showOrderPlacedAlert ? (
                            <div className="col-12">
                            <div className='alert alert-success alert-dismissible fade show mt-1' role='alert'>
                                You Order has been placed.
                                <button className="close" type='button' data-dismiss='alert'>
                                    <span>&times;</span>
                                </button>
                            </div>
                            </div>
                        ) : (
                            ""

                        )}


                        {showOrderDeletedAlert ? (
                            <div className="col-12">
                            <div className='alert alert-danger alert-dismissible fade show mt-1' role='alert'>
                                Your item has removed from the cart.
                                <button className="close" type='button' data-dismiss='alert'>
                                    <span>&times;</span>
                                </button>
                            </div>
                            </div>
                        ) : (
                            ""

                        )}





                        {OrdersService.getCart(orders).length === 0 ? (<div
                            className="text-danger"> No products in your cart </div>) : (
                            ""
                        )}

                        {OrdersService.getCart(orders).map((ord) => {
                            return <Order
                                key={ord.id}
                                orderId={ord.id}
                                productId={ord.productId}
                                userId={ord.userId}
                                isPaymentCompleted={ord.isPaymentCompleted}
                                quantity={ord.quantity}
                                productName={ord.product.productName}
                                price={ord.product.price}
                                onBuyNowClick={onBuyNowClick}
                                onDeleteClick={onDeleteClick}
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