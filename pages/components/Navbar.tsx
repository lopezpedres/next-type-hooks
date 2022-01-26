import React from 'react';

interface Props{
    user:{
        name: string
        lastname?: string
        admin: boolean
        birthday: Date
    }
}


export const Navbar:React.FC<Props> = ({user}) => {
  return <div>
      <a>
          {user.name}
      </a>
      {user.admin
      && <a>Admin</a>}


  </div>;
};
