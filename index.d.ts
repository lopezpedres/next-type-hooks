// Types for Users
type TUserId = string;
type TUser = {
  name: string;
  lastname?: string;
  admin: boolean;
  birthday?: Date;
};

type TUsers = TUser[];

//Types for suppliers
type TSupplierId = string;
type TSupplier = {
  id?: TSupplierId;
  name: string;
  email: string;
  description: string;
};

type TSuppliers = TSupplier[];

// Types for ingredients
type TIngredientId = string;
type TIngredient = {
  id?: TIngredientId;
  name: string;
  quantity: number;
  supplierId: string;
};

//ALL PRODUCT TYPES

//Types for products
type TProductId = string;
type TProduct = {
  id?: TProductId;
  name: string;
  quantity: number;
  ingredientList: ProductIngredients[];
};

//Mean to be used for the list of ingredients of a product
interface ProductIngredients {
  quantity: number;
  ingredientId: TIngredientId;
}

// Payload Interface of Product-Ingredients
interface IngredientsQuantityPayload {
  quantityOfIngredientsUsed: number;
  ingredients: {
    connect: {
      id: string;
    };
  };
}
