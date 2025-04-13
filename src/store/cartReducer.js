export const initialState = {
  cartList: [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "GET_CART":
      return { ...state, cartList: action.payload.carts || [] };

    case "ADD_TO_CART":
      return { ...state, cartList: action.payload.carts };

    case "REMOVE_CART":
      return { ...state, cartList: [] };

    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cartList: state.cartList.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartList: state.cartList.map((item) =>
          item.id === action.payload.product_id
            ? {
              ...item,
              qty: action.payload.qty,
              total: item.product.price * action.payload.qty,
            }
            : item
        ),
      };

    default:
      return state;
  }
};
