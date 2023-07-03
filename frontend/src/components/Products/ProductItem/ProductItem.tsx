import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";

import { addToCart } from "../../../actions/cart";
import { deleteProduct } from "../../../actions/userProducts";
import { setError } from "../../../actions/error";
import { AppState } from "../../../reducers";

import { Product } from "../../../interfaces";
import "./ProductItem.scss";

interface Props {
  product: Product;
  myProduct?: boolean;
}
const ProductItem = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state: AppState) => state.user);

  const addToCartHandler = () => {
    if (user.isLoggedIn === false) {
      dispatch(setError("You must be logged in!"));
      navigate('/signin');
      return;
    }
    dispatch(addToCart(props.product._id, user, navigate));
  };

  const deleteProductHandler = () => {
    dispatch(deleteProduct(props.product._id, user,navigate));
  };

  const editProductHandler = () => {
    dispatch({ type: "SET_EDIT_PRODUCT", payload: props.product });
    navigate("/user/edit-product");
  };
  const description = props.product.description;
  const name = props.product.name;

  return (
    <Link to={`/products/${props.product._id}`} style={{color:"white",textDecoration:"none"}}>
    <div className="product-item">
      <div className="product-item__image">
        <img src={props.product.image} alt={props.product.image} />
      </div>
      <div className="product-item__content">
        <div className="product-item__content-left">
          <h2>{name.length < 20 ? name : name.substr(0, 20) + "..."}</h2>
          <p>
            {description.length < 160
              ? description
              : description.substr(0, 100) + "..."}
          </p>
        </div>
        <div className="product-item__content-right">
          <h3>${props.product.price}</h3>
          <div className="product-item__content-right-actions">
            {props?.myProduct === true ? (
              <>
                <button onClick={deleteProductHandler} className="full-button">
                  delete
                </button>
                <button onClick={editProductHandler} style={{marginTop:"5px"}}>edit</button>
              </>
            ) : (
              <button onClick={addToCartHandler} className="full-button">
                Buy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductItem;
