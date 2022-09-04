import React, { useState, useEffect } from 'react';
import { ProductsService, CategoriesService, BrandsService } from './Service';





function ProductsList(props) {

    let [search, setSearch] = useState("");
    let [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {


            //Get Fucking Brands
            let brandsResponse = await BrandsService.fetchBrands();
            let brandsResponseBody = await brandsResponse.json();

            //Get Fucking Categories
            let categoriesResponse = await CategoriesService.fetchCategories();
            let categoriesResponseBody = await categoriesResponse.json();



            // //{Product}
            // let productsResponse = await ProductsService.fetchProducts();
            let productsResponse = await fetch(
                `http://localhost:5000/products?productName_like=${search}`,
                { method: "GET"}
            );
            let productsResponseBody = await productsResponse.json();

            //set category property on each product
            productsResponseBody.forEach(product => {
                product.category = CategoriesService.getCategoryByCategoryId
                    (categoriesResponseBody, product.categoryId)

                product.brand = BrandsService.getBrandByBrandId
                    (brandsResponseBody, product.brandId)
            });



            setProducts(productsResponseBody);
        })();

    }, [search]);

    return (
        <div className='row'>
            <div className="col-12">
                <div className="row p-3 header">
                    <div className="col-lg-3">
                        <h4>
                            <i className="fa fa-suitcase"></i>
                            &nbsp;
                            Products&nbsp;
                            <span className="badge badge-secondary">{products.length}</span>
                        </h4>
                    </div>

                    <div className="col-lg-9">
                        <input type="search"
                            placeholder='Search'
                            className='form-control'
                            autoFocus="autofocus"
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                            }} />
                    </div>
                </div>
            </div>

            <div className="col-lg-10 mx-auto mb-2">
                <div className="card my-2 shadow">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.price}</td>
                                        <td>{product.brand.brandName}</td>
                                        <td>{product.category.categoryName}</td>
                                        <td>

                                            {[...Array(product.rating).keys()].map((n) => {
                                                return <i className="fa fa-star text-warning" key={n}></i>;
                                            })}
                                            {[...Array(5 - product.rating).keys()].map((n) => {
                                                return <i className="fa fa-star-o text-warning" key={n}></i>;
                                            })}


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ProductsList;