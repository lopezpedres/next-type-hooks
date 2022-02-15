import React, { useEffect, useState } from "react";
import { fetcher } from "../../utils/fetcher";


interface ProductProps{
  ingredientsQuantityList: ProductIngredients[]
  setTngredientsQuantityList: React.Dispatch<React.SetStateAction<ProductIngredients[]>>
  ingredientsQuantityPayload:IngredientsQuantityPayload[]
  setIngredientsQuantityPayload:React.Dispatch<React.SetStateAction<IngredientsQuantityPayload[]>>
}



const InitialFormProduct:ProductIngredients = {
  quantity:0,
  ingredientId: ""
};

const ProductIngredients= ({ingredientsQuantityList, ingredientsQuantityPayload, setTngredientsQuantityList,setIngredientsQuantityPayload}:ProductProps) => {

  const [newFormProduct, setNewFormProduct] = useState<ProductIngredients>(
    InitialFormProduct
  );

  //Here I store the list of ingredients with its corresponding quantity, this need to be moved to the 
  // const [ingredientsQuantityList, setTngredientsQuantityList] = useState<ProductForm[]>([])

  //Here I store my Ingredients
  const [ingredientsList, setIngredientsList] = useState<TIngredient[]>([]);

  //Here I deconstruct the product object
  const {quantity, ingredientId } = newFormProduct;

  //Getting Ingredients when Loading the page
  useEffect(() => {
    console.log("Using UseEffect to get Ingredients")
    const ingredientsHandler = async () => {
      const ingredientsFetcher = await fetcher("/api/ingredients");
      setIngredientsList(ingredientsFetcher);
    };
    ingredientsHandler();
  }, []);

  // Handeling Form Submit
  const newProductHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const changedIngredientsQuantity=[
        ...ingredientsQuantityList,
        newFormProduct
    ]

    setTngredientsQuantityList(changedIngredientsQuantity)

    //IngredientsQuantity Payload

    const newQuantityIngredient:IngredientsQuantityPayload = {
      quantityOfIngredientsUsed:quantity,
      ingredients: {
        connect: {
          id: ingredientId
        }
      }
    }
    const changedIngredientsQuantityPayload=[
      ...ingredientsQuantityPayload,
      newQuantityIngredient
  ]

    setIngredientsQuantityPayload(changedIngredientsQuantityPayload)


  }

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const changedFormValues = {
      ...newFormProduct,
      [event.target.name]: event.target.type==="number"? parseInt(event.target.value)  :event.target.value
    };
    setNewFormProduct(changedFormValues);
  };
  return (
    <div>
        <div>
            List of Ingredients and Quantity selectedL:
            {ingredientsQuantityList.length!==0?
            <ul>
                {ingredientsQuantityList.map(item=>(
                  // Eventually I need to show the ingredients name and not the id
                    <li key={item.ingredientId}>Ingredient id:{item.ingredientId} Quantity used:{item.quantity}</li>
                )
                )}
            </ul>
            :

            <p>No ingredients selected yet</p>}
        </div>
      <form onSubmit={newProductHandler}>
       
        <label >
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
            <option key = {ingredient.id} value={ingredient.id}>{ingredient.name}</option>
          ))}
        </select>
        <br />
        <button>Add new Ingredient</button>
      </form>
    </div>
  );
};

export default ProductIngredients