import type { NextPage } from "next";
import React from "react";
import Users from "./views/users";
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  


    return  (
         <div className={styles.container} >
             <Users/>


    </div>
    )
    
}
export default Home;