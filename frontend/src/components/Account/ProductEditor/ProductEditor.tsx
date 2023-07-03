import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";

import { createProduct } from "../../../actions/userProducts";
import { setError } from "../../../actions/error";
import { editProduct } from "../../../actions/userProducts";
import { AppState } from "../../../reducers";
import { Product } from "../../../interfaces";

import "./ProductEditor.scss";

const productInitialState: Product = {
  name: "",
  image: "",
  price: 0,
  description: "",
};
const ProductEditor = (props: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const editingProduct = useAppSelector(
    (state: AppState) => state.userProducts.editingProduct
  );

  const [productData, setProductData] = useState<Product>(
    editingProduct.isEditing ? editingProduct.product : productInitialState
  );

  const createProductHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (productData.name.length === 0) {
      dispatch(setError("Name must be non-empty"));
      return;
    }
    if (productData.image.length === 0) {
      dispatch(setError("Product must have an image "));
      return;
    }
    if (productData.price === 0) {
      dispatch(setError("Price should not be 0"));
      return;
    }
    if (productData.description.length === 0) {
      dispatch(setError("Description must be non-empty"));
      return;
    }
    if (editingProduct.isEditing) {
      const productId = editingProduct._id;
      dispatch(editProduct(productData, productId, user, navigate));
    } else {
      dispatch(createProduct(productData, user, navigate));
    }
  };

  return (
    <div className="product-editor">
      <form onSubmit={createProductHandler}>
        {editingProduct.isEditing ? (
          <h1>Edit product</h1>
        ) : (
          <h1>Create new product</h1>
        )}

        <label>Name</label>
        <input
          type="text"
          placeholder="name of the product..."
          value={productData.name}
          onChange={(event) =>
            setProductData((prevState: any) => ({
              ...prevState,
              name: event.target.value,
            }))
          }
        />
        <label>Image url</label>
        <input
          type="text"
          placeholder="url..."
          value={productData.image}
          onChange={(event) =>
            setProductData((prevState: any) => ({
              ...prevState,
              image: event.target.value,
            }))
          }
        />
        {/* <input
            type="file"
            onChange={(event) =>
              setProductData((prevState: any) => {
                if (event.target.files)
                  return { ...prevState, image: event.target.files[0] };
              })
            }
          /> */}
        <label>Price</label>
        <input
          type="number"
          placeholder="price..."
          value={productData.price}
          onChange={(event) =>
            setProductData((prevState: any) => ({
              ...prevState,
              price: event.target.value,
            }))
          }
        />
        <label>Description</label>
        <textarea
          placeholder="description..."
          value={productData.description}
          onChange={(event) =>
            setProductData((prevState: any) => ({
              ...prevState,
              description: event.target.value,
            }))
          }
        />
        <br />
        <button type="submit" className="full-button">
          {editingProduct.isEditing ? "edit product" : "create product"}
        </button>
      </form>
    </div>
  );
};

export default ProductEditor;
