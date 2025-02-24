import axios from "axios";
import { createContext, useReducer, useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

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

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  // 取得購物車列表
  const getCart = async () => {
    try {
      setIsScreenLoading(true);
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      dispatch({ type: "GET_CART", payload: res.data.data });
    } catch (error) {
      alert("取得購物車列表失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  // 加入購物車
  const addCartItem = async (product_id, quantity) => {
    try {
      // 先檢查購物車內是否已經有這個品項
      const existingItem = state.cartList.find(
        (item) => item.product.id === product_id
      );

      if (existingItem) {
        const updatedQty = existingItem.qty + Number(quantity);

        // 🔴 限制數量最多 10
        if (updatedQty > 10) {
          alert("該商品最多只能購買 10 件！");
          return;
        }

        // 更新數量
        await axios.put(
          `${BASE_URL}/v2/api/${API_PATH}/cart/${existingItem.id}`,
          {
            data: { product_id, qty: updatedQty },
          }
        );
      } else {
        // 如果商品不存在，則新增
        if (Number(quantity) > 10) {
          alert("該商品最多只能購買 10 件！");
          return;
        }

        await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
          data: { product_id, qty: Number(quantity) },
        });
      }

      await getCart(); // 更新購物車列表
    } catch (error) {
      alert("加入購物車失敗");
    }
  };

  // 刪除全部購物車品項
  const removeCart = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
      dispatch({ type: "REMOVE_CART" });
    } catch (error) {
      alert("刪除購物車失敗");
    }
  };

  // 刪除單一購物車品項
  const removeCartItem = async (cartItem_id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`
      );
      dispatch({ type: "REMOVE_CART_ITEM", payload: cartItem_id });
    } catch (error) {
      alert("刪除購物車失敗");
    }
  };

  // 更新數量
  const updateQuantity = async (product_id, qty) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/v2/api/${API_PATH}/cart/${product_id}`,
        {
          data: { product_id, qty },
        }
      );
      dispatch({ type: "UPDATE_QUANTITY", payload: res.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList: state.cartList,
        addCartItem,
        removeCart,
        removeCartItem,
        updateQuantity,
        isScreenLoading,
        setIsScreenLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
