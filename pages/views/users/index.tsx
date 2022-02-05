
import React, { useState } from "react";
import { fetcher } from "../../utils/fetcher";

const formNewUser = {
  name: "",
  lastname: "",
  admin: false,
};

const Users:  React.FC = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [newFormUser, setNewFormUser] = useState<TUser>(formNewUser);
  const {name,lastname}= newFormUser

  const usersHandler = async () => {
    const users = await fetcher("/api/users");
    setUsers(users);
  };
  const newUserHandler = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetcher("/api/users", newFormUser);
    console.log("New user has been addd from the index");
    setNewFormUser(formNewUser)
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const changedFormValues = {
      ...newFormUser,
      [event.target.name]:
        event.target.value === "admin" ? true : event.target.value,
    };
    setNewFormUser(changedFormValues);


  };
  return (
    <div>
      <button onClick={() => usersHandler()}>GET ALL USERS</button>
      <ul>
        {
        users?
        users.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))
        :
        <span>There are no users in the database</span>
        }
      </ul>
      <form onSubmit={newUserHandler}>
        <input
          name="name"
          value={name}
          placeholder="Name"
          onChange={onChangeHandler}
        ></input><br/>
        <input
          name="lastname"
          value={lastname}
          placeholder="Last Name"
          onChange={onChangeHandler}
        ></input><br/>
        <input
          type="checkbox"
          name="admin"
          value="admin"
          placeholder="Admin"
          onChange={onChangeHandler}
        ></input><br/>
        <button>Add new user</button>
      </form>
    </div>
  );
};

export default Users;
