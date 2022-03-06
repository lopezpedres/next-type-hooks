import React, { useEffect, useState, useReducer } from "react";
import { fetcher } from "../../utils/fetcher";
import ProductIngredientsReducer from "./ProductIngredientsReducer";

interface ProductProps {
  ingredientsQuantityList: ProductIngredients[];
  setTngredientsQuantityList: React.Dispatch<
    React.SetStateAction<ProductIngredients[]>
  >;
  ingredientsQuantityPayload: IngredientsQuantityPayload[];
  setIngredientsQuantityPayload: React.Dispatch<
    React.SetStateAction<IngredientsQuantityPayload[]>
  >;
}

const InitialFormProduct: ProductIngredients = {
  quantity: 0,
  ingredientId: "",
};

const ProductIngredients = ({
  ingredientsQuantityList,
  ingredientsQuantityPayload,
  setTngredientsQuantityList,
  setIngredientsQuantityPayload,
}: ProductProps) => {
  //Here I store the state of my form and then deconstruct the object
  const [newFormProduct, setNewFormProduct] = useState<ProductIngredients>(InitialFormProduct);

  const { quantity, ingredientId } = newFormProduct;

  //Here I store my Ingredients
  const [ingredientsList, setIngredientsList] = useState<TIngredient[]>([]);

  //useReducer
  const MainProductIngredientList= [] as ProductIngredientsState[]

  const [ProductIngredientState, pIDispatch] = useReducer(ProductIngredientsReducer, MainProductIngredientList)
  //Getting Ingredients when Loading the page
  useEffect(() => {
    console.log("Using UseEffect to get Ingredients");
    const ingredientsHandler = async () => {
      const ingredientsFetcher = await fetcher("/api/ingredients");
      setIngredientsList(ingredientsFetcher);
    };
    ingredientsHandler();
  }, []);
  //I have to still handle when the ingredient-quantity list is ready to be added to the ingredientsQuantityList
  // I was doing this with the form, but now I have to send it in a different way
  // Handeling Form Submit
 
    // const changedIngredientsQuantity = [
    //   ...ingredientsQuantityList,
    //   newFormProduct,
    // ];

    // setTngredientsQuantityList(changedIngredientsQuantity);

    //IngredientsQuantity Payload

    const newQuantityIngredient: IngredientsQuantityPayload = {
      quantityOfIngredientsUsed: quantity,
      ingredients: {
        connect: {
          id: ingredientId,
        },
      },
    };
    const changedIngredientsQuantityPayload = [
      ...ingredientsQuantityPayload,
      newQuantityIngredient,
    ];

    setIngredientsQuantityPayload(changedIngredientsQuantityPayload);

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

  const removeHandler=(item:ProductIngredientsState)=>{
    pIDispatch({type: 'remove',
    IngredientId: item.ingredientId,
    quantity:quantity})
  }

  const editHandler=()=>{
    pIDispatch({type: 'edit',
    IngredientId:ingredientId,
    quantity: quantity})
    //I COULD HANDLE IT HERE "SEE COMMENT FROM LINE 48"
  }

  const addHandler=()=>{
    pIDispatch({type: 'add',
    IngredientId: ingredientId,
    quantity: quantity})
  }
  return (
    <div>
      <div>
        List of Ingredients and Quantity selected:
        {ProductIngredientState.length !== 0 ? (
          <ul>
            {ProductIngredientState.map((item) => (
              // Eventually I need to show the ingredients name and not the id
              // This issue 
              <li key={item.ingredientId}>
                Ingredient id:{item.ingredientId} Quantity used:{item.quantity}
                <button onClick={()=> removeHandler(item)}>Remove</button>
                <button onClick={()=> editHandler()}>Edit</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ingredients selected yet</p>
        )}
      </div>
      <div >
        <label>
          Quantity:
          <input
            name="quantity"
            type="number"
            value={quantity}
            onChange={onChangeHandler}
          ></input>
        </label>
        <br />

        <select
          name="ingredientId"
          value={ingredientId}
          onChange={onChangeHandler}
        >
          {ingredientsList.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </select>
        <br />
        <button onClick={()=>addHandler()}>Add new Ingredient</button>
      </div>
    </div>
  );
};

export default ProductIngredients;
