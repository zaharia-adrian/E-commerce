import { useAppSelector } from "../../../store/store";
import { Link } from "react-router-dom";
import ProductItem from "../../Products/ProductItem/ProductItem";
import { AppState } from "../../../reducers";

import "./UserProducts.scss";

const UserProducts = () => {
  const products = useAppSelector(
    (state: AppState) => state.userProducts.products
  );

  const user = useAppSelector((state: AppState) => state.user);
  return (
    <div className="user-products">
      <div className="user-products__content">
        {products.length > 0 ? (
          products?.map((product) => (
            <ProductItem product={product} myProduct={true} />
          ))
        ) : (
          <p>
            You have no products.
            <Link to="/user/create-product" style={{ color: "white" }}>
              Start by creating one
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProducts;
