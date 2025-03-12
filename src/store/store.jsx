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
  const [toastMessage, setToastMessage] = useState({ type: '', text: '' }); // toast狀態

  // toast開啟
  const showToast = (message, type) => {
    setToastMessage({ text: message, type }); // 顯示訊息
    setTimeout(() => setToastMessage({
      text: '',
      type: ''
    }), 3000); // 3秒後清除
  };

  // 取得購物車列表
  const getCart = async () => {
    try {
      setIsScreenLoading(true);
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      dispatch({ type: "GET_CART", payload: res.data.data });
    } catch (error) {
      showToast('取得購物車列表失敗', 'danger');
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
          showToast('該商品最多只能購買 10 件！', 'danger');
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
          showToast('該商品最多只能購買 10 件！', 'danger');
          return;
        }

        await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
          data: { product_id, qty: Number(quantity) },
        });
      }

      await getCart(); // 更新購物車列表
      showToast('加入購物車成功！', 'success');
    } catch (error) {
      showToast('加入購物車失敗', 'danger');
    }
  };

  // 刪除全部購物車品項
  const removeCart = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
      dispatch({ type: "REMOVE_CART" });
      showToast('購物車已清空', 'success');
    } catch (error) {
      showToast('刪除購物車失敗', 'danger');
    }
  };

  // 刪除單一購物車品項
  const removeCartItem = async (cartItem_id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`
      );
      dispatch({ type: "REMOVE_CART_ITEM", payload: cartItem_id });
      showToast('商品已從購物車中移除', 'success');
    } catch (error) {
      showToast('刪除購物車品項失敗', 'danger');
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
      showToast('數量更新成功', 'success');
    } catch (error) {
      showToast('數量更新失敗', 'danger');
    }
  };

  // 結帳 + 清空購物車
  const checkout = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('formData'));
      const resComplete = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`,
        {
          "data": {
            "user": {
              "name": userData.name,
              "email": userData.email,
              "tel": userData.tel,
              "address": userData.address || "沒有預設這個欄位"
            },
            "message": userData.userMessage || "",
          }
        }
    );
      dispatch({ type: "REMOVE_CART" }); // 清空購物車
      showToast('訂單已完成', 'success');
      localStorage.clear(); // 清除 localStorage
    } catch (error) {
      alert('訂單失敗');
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
        checkout,
        toastMessage, // toast訊息
        showToast, //讓外部元件可以使用 showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
