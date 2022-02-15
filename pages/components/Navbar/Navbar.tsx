import Link from "next/link";
import React from "react";

interface Props {
  user: {
    name: string;
    lastname?: string;
    admin: boolean;
    birthday: Date;
  };
}

export const Navbar: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <div className="NavbarItems">
        <a>{user.name}-</a>
        {user.admin && <a>Admin-</a>}
        <Link href="/views/users">
          <a>Users-</a>
        </Link>
        <Link href="/views/orders">
          <a>orders-</a>
        </Link>
        <Link href="/views/products">
          <a>Products-</a>
        </Link>
        <Link href="/views/ingredients">
          <a>Ingredients-</a>
        </Link>
        <Link href="/views/suppliers">
          <a>Suppliers</a>
        </Link>
      </div>
    </div>
  );
};
