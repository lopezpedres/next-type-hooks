
import React, { useState } from "react";
import { fetcher } from "../../utils/fetcher";

const formNewSupplier = {
  name: "",
  email: "",
  description: "",
};

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<TSupplier[]>([]);
  const [newFormSupplier, setNewFormSupplier] = useState<TSupplier>(formNewSupplier);
  const {name,email, description}= newFormSupplier

  const usersHandler = async () => {
    const suppliersFetcher = await fetcher("/api/suppliers");
    setSuppliers(suppliersFetcher);
  };
  const newUserHandler = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetcher("/api/suppliers", newFormSupplier);
    console.log("New user has been addd from the index");
    setNewFormSupplier(newFormSupplier)
  };


  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const changedFormValues = {
      ...newFormSupplier,
      [event.target.name]:
        event.target.value === "admin" ? true : event.target.value,
    };
    setNewFormSupplier(changedFormValues);


  };
  return (
    <div>
      <button onClick={() => usersHandler()}>GET ALL SUPPLIERS</button>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.name}>{supplier.name}</li>
        ))}
      </ul>
      <form onSubmit={newUserHandler}>
        <input
          name="name"
          value={name}
          placeholder="Name"
          onChange={onChangeHandler}
        ></input><br/>
        <input
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChangeHandler}
        ></input><br/>
        <textarea
          name="description"
          value={description}
          placeholder="description"
          onChange={onChangeHandler}
        /><br/>
        <button>Add new supplier</button>
      </form>
    </div>
  );
};

export default Suppliers;
