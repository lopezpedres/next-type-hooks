import React, { useEffect, useState } from "react";
import { fetcher } from "../../utils/fetcher";

interface TFormIngredients{
  name: string
  quantity: number
  supplierId: string

}

const InitialFormIngredient:TFormIngredients = {
  name: "",
  quantity: 0,
  supplierId: "",
};

const Users: React.FC = () => {
  //Here I save all  my Ingredients
  const [ingredients, setIngredient] = useState<TIngredient[]>([]);
  // Here I handle the Form info
  const [newFormIngredient, setNewFormIngredient] = useState<TIngredient>(
    InitialFormIngredient
  );

  //Here I store my suppliers
  const [suppliers, setSuppliers] = useState<TSuppliers>([]);
  //Here I deconstructec the form 
  const { name, quantity, supplierId } = newFormIngredient;

  //Getting Suppliers when Loading the page
  useEffect(() => {
    console.log("Using UseEffect")
    const usersHandler = async () => {
      const suppliersFetcher = await fetcher("/api/suppliers");
      setSuppliers(suppliersFetcher);
    };
    usersHandler();
  }, []);

  // Getting the Ingredients
  const usersHandler = async () => {
    const ingredients = await fetcher("/api/ingredients");
    setIngredient(ingredients);
  };
  // Handeling Form Submit
  const newUserHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    await fetcher("/api/ingredients", newFormIngredient);
    console.log("New Ingredient has been added from the index");
    setNewFormIngredient(InitialFormIngredient);
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const changedFormValues = {
      ...newFormIngredient,
      [event.target.name]: event.target.type==="number"? parseInt(event.target.value)  :event.target.value
    };
    setNewFormIngredient(changedFormValues);
    console.log(typeof(changedFormValues.quantity))
  };
  return (
    <div>
      <button onClick={() => usersHandler()}>GET ALL INGREDIENTS</button>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.name}>{ingredient.name}</li>
        ))}
      </ul>
      <form onSubmit={newUserHandler}>
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
        <select
        name="supplierId"
        value={supplierId}
          onChange={onChangeHandler}
        >
          {suppliers.map((supplier) => (
            <option key = {supplier.name}value={supplier.id}>{supplier.name}</option>
          ))}
        </select>
        <br />
        <button>Add new Ingredient</button>
      </form>
    </div>
  );
};

export default Users;
