import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "./UserContext";
import { BrandsService, CategoriesService, ProductsService } from "./Service";
import Product from './Product';

function Store(props) {

    //state
    let [brands, setBrands] = useState([]);
    let [categories, setCategories] = useState([]);
    let [products, setProducts] = useState([]);
    //get User Context
    let userContext = useContext(UserContext);
    useEffect(() => {
        (async () => {
            //get brands from db
            let brandsResponse = await BrandsService.fetchBrands();
            let brandsResponseBody = await brandsResponse.json();
            brandsResponseBody.forEach((brand) => {
                brand.isChecked = true;
            });

            setBrands(brandsResponseBody);

            //get categories from db
            let categoriesResponse = await CategoriesService.fetchCategories();
            let categoriesResponseBody = await categoriesResponse.json();
            categoriesResponseBody.forEach((category) => {
                category.isChecked = true;
            });

            setCategories(categoriesResponseBody);

            //get products from db
            let productsResponse = await ProductsService.fetchProducts();
            let productsResponseBody = await productsResponse.json();

            if (productsResponse.ok) {
                productsResponseBody.forEach((product) => {

                    //set brand
                    product.brand = BrandsService.getBrandByBrandId(brandsResponseBody, product.brandId);

                    //set category
                    product.category = CategoriesService.getCategoryByCategoryId(categoriesResponseBody, product.categoryId);
                    product.isOrdered = false;

                });

                setProducts(productsResponseBody);
                document.title = "Store - eCommmerce"
            }

        })();
    }, []);

    //UpdateBrandIsChecked
    let UpdateBrandIsChecked = (id) => {
        let brandsData = brands.map((brd) => {
            if (brd.id === id) brd.isChecked = !brd.isChecked;
            return brd;
        });

        setBrands(brandsData);
    };

    //UpdateCategoryIsChecked
    let UpdateCategoryIsChecked = (id) => {
        let categoryData = categories.map((cat) => {
            if (cat.id === id) cat.isChecked = !cat.isChecked;
            return cat;
        });

        setCategories(categoryData);
    };

    //When Users Click the Add to Cart
    let onAddToCartClick = (prod) => {

        (async () => {
            let newOrder = {
                userId: userContext.user.userId,
                productId: prod.id,
                quantity: 1,
                isPaymentCompleted: false,
            };
        })();

    };


    return (
        <div>
            <div className="row py-3 header">
                <div className="col-lg-3">
                    <h4>
                        <i className="fa fa-shopping-bag"></i>
                        Store
                    </h4>
                </div>
            </div>


            <div className="row">

                <div className="col-lg-3 py-2">


                    <div className="my-2">
                        <h5>Brands</h5>
                        <ul className="list-group list-group-flush">
                            {brands.map((brand) => (
                                <li className='list-group-item' key={brand.id}>
                                    <div className="form-check">
                                        <input type="checkbox"
                                            className="form-check-input"
                                            value="true"
                                            checked={brand.isChecked}
                                            onChange={() => { UpdateBrandIsChecked(brand.id) }}
                                        />
                                        <label htmlFor={`brand${brand.id}`}>
                                            {brand.brandName}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className="my-2">
                        <h5>Categories</h5>
                        <ul className="list-group list-group-flush">
                            {categories.map((category) => (
                                <li className='list-group-item' key={category.id}>
                                    <div className="form-check">
                                        <input type="checkbox"
                                            className="form-check-input"
                                            value="true"
                                            checked={category.isChecked}
                                            onChange={() => { UpdateCategoryIsChecked(category.id) }}
                                        />
                                        <label htmlFor={`category${category.id}`}>
                                            {category.categoryName}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>



                </div>
                <div className="col-lg-9">
                    <div className="row">
                        {products.map((prod) => (
                            <Product key={prod.id} product={prod} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Store;