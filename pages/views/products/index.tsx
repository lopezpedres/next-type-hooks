import React, { useEffect, useState } from "react";
import ProductIngredients from "../../components/Product/ProductIngredients";
import { fetcher } from "../../utils/fetcher";

interface ProductForm {
  name: string;
  quantity: number;
}

const InitialFormProduct: ProductForm = {
  name: "",
  quantity: 0,
};

const Products = () => {
  //These is the array that I am going to be reciving in the props
  const [ingredientsQuantityList, setTngredientsQuantityList] = useState<
    ProductIngredients[]
  >([]);
  //There is the state i am going to be using to change the structure of my
  //ingredientsQuantityList for the Porduct Payload
  const [ingredientsQuantityPayload, setIngredientsQuantityPayload] = useState<
    IngredientsQuantityPayload[]
  >([]);

  //Here I save all  my Products that come from the database
  const [products, setProducts] = useState<TProduct[]>([]);
  // Here I handle the Form info
  const [newFormProduct, setNewFormProduct] =
    useState<ProductForm>(InitialFormProduct);

  //Here I deconstruct the product object
  const { name, quantity } = newFormProduct;

  // Getting the Products
  const productHandler = async () => {
    const product = await fetcher("/api/products");
    setProducts(product);
  };
  // Handeling Form Submit
  const newProductHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Eventually I need to create a type for this object so It can be accepted by the fetcher and then remove the any in the fetcher function
    const payload = {
      name,
      quantity,
      productIngredients: {
        create: ingredientsQuantityPayload,
      },
    };

    await fetcher("/api/products", payload);
    console.log("New Product has been added from the index");
    setNewFormProduct(InitialFormProduct);
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const changedFormValues = {
      ...newFormProduct,
      [event.target.name]:
        event.target.type === "number"
          ? parseInt(event.target.value)
          : event.target.value,
    };
    setNewFormProduct(changedFormValues);
  };
  return (
    <div>
      <button onClick={() => productHandler()}>GET ALL PRODUCTS</button>
      <ul>
        {products.length !== 0 ? (
          products.map((product) => (
            <li key={product.name}>
              Product Name: {product.name} - Quantity: {product.quantity}
            </li>
          ))
        ) : (
          <p>There are no products to show</p>
        )}
      </ul>
      <form onSubmit={newProductHandler}>
        <input
          name="name"
          value={name}
          placeholder="Name"
          onChange={onChangeHandler}
        ></input>
        <br />
        Quantity
        <input
          name="quantity"
          type="number"
          value={quantity}
          onChange={onChangeHandler}
        ></input>
        <br />
        <button>Add new Product</button>
      </form>
      <ProductIngredients
        ingredientsQuantityList={ingredientsQuantityList}
        setTngredientsQuantityList={setTngredientsQuantityList}
        ingredientsQuantityPayload={ingredientsQuantityPayload}
        setIngredientsQuantityPayload={setIngredientsQuantityPayload}
      />
    </div>
  );
};

export default Products;
