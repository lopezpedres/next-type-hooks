import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { getUsers } from "./utils/getUsers";
import { newUser } from "./utils/newUser";

const Home: NextPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  const usersHandler = async () => {
    const users = await getUsers('/api/users')
    setUsers(users);
  };
  const newUserHanlder =async () => {
    await newUser('/api/users',{name:"Zoe", lastname:"Cristiano", admin:true})
    console.log("New user has been addd from the index")
  }
  return (
    <div className={styles.container}>
      <button onClick={() => usersHandler()}>GET ALL USERS</button>
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
      <input onSubmit={()=>newUserHanlder()}>


      </input>
      <button onClick={()=>newUserHanlder()}>
        New User
      </button>
    </div>
  );
};

export default Home;
