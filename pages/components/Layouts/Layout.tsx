import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import users from "../../data/data"

const usersArray = (users:Record<TUserId,TUser>)=>{
  const allUsersArray = Object.values(users)
  return allUsersArray

}

const user = {
  name: "Miguel",
  lastname: "Lopez",
  admin:true,
  birthday: new Date(1995,3,11)
}

const Layout:React.FC = ({children}) => {
  return <div>
    <Navbar user={user}/>

      {children}

      

  </div>;
};

export default Layout;
