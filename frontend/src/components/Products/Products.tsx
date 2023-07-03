import { useAppSelector } from "../../store/store";

import ProductItem from "./ProductItem/ProductItem";
import { AppState } from "../../reducers";
import { Product } from "../../interfaces";
import "./Products.scss";

interface ProductState {
  products: Product[];
}

const Products = () => {
  const products = useAppSelector((state: AppState) => state.shopProducts.products);
  return (
    <div className="products__wrapper">
      <h1>Products</h1>
      <br />
      <div className="products__content">
        {products.map((product:Product) => <ProductItem product={product} /> )}
      </div>
    </div>
  );
};

export default Products;
