const ProductIngredientsReducer = (
  state: ProductIngredientsState[],
  action: ProductIngredientAction
) => {
  // const { type, item: ingredientId, quantity } = action;

  switch (action.type) {
    case "remove":
      console.log("You clicked the remove dispatch")
      return state.filter((t) => t.ingredientId !== action.IngredientId);
    case "edit":
      return state;
    case "add":
      return [...state,{quantity:action.quantity, ingredientId:action.IngredientId}];
    default:
      throw new Error("Unknown Action");
  }
};

export default ProductIngredientsReducer;
