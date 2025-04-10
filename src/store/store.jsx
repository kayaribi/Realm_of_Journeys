import axios from "axios";
import PropTypes from "prop-types";
import swal from "sweetalert2";
import { useReducer, useEffect, useState, useCallback } from "react";
import { initialState, cartReducer } from "./cartReducer";
import { CartContext } from "./CartContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: '', text: '' });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem("userToken"));

  const loginAdmin = (token, expired) => {
    const expirationTime = new Date(expired).toISOString();
    localStorage.setItem("userToken", token);
    localStorage.setItem("tokenExpired", expirationTime);
    axios.defaults.headers.common["Authorization"] = token;
    setIsAdminLoggedIn(true);

    const isExpired = new Date(expirationTime) < new Date();
    if (isExpired) {
      console.warn("Token 已過期，強制登出");
      logoutAdmin();
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("tokenExpired");
    axios.defaults.headers.common["Authorization"] = "";
    setIsAdminLoggedIn(false);
  };

  const showToast = (message, type) => {
    setToastMessage({ text: message, type });
    setTimeout(() => setToastMessage({ text: '', type: '' }), 3000);
  };

  const getCart = useCallback(async () => {
    try {
      setIsScreenLoading(true);
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      dispatch({ type: "GET_CART", payload: res.data.data });
    } catch {
      showToast('取得購物車列表失敗', 'danger');
    } finally {
      setIsScreenLoading(false);
    }
  }, []);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const addCartItem = async (product_id, quantity) => {
    try {
      const existingItem = state.cartList.find(
        (item) => item.product.id === product_id
      );

      const updatedQty = existingItem ? existingItem.qty + Number(quantity) : Number(quantity);

      if (updatedQty > 10) {
        showToast('該商品最多只能購買 10 件！', 'danger');
        return;
      }

      if (existingItem) {
        await axios.put(
          `${BASE_URL}/v2/api/${API_PATH}/cart/${existingItem.id}`,
          { data: { product_id, qty: updatedQty } }
        );
      } else {
        await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
          data: { product_id, qty: Number(quantity) },
        });
      }

      await getCart();
      showToast('加入購物車成功！', 'success');
    } catch {
      showToast('加入購物車失敗', 'danger');
    }
  };

  const removeCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
      dispatch({ type: "REMOVE_CART" });
      showToast('購物車已清空', 'success');
    } catch {
      showToast('刪除購物車失敗', 'danger');
    }
  };

  const removeCartItem = async (cartItem_id) => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`);
      dispatch({ type: "REMOVE_CART_ITEM", payload: cartItem_id });
      showToast('商品已從購物車中移除', 'success');
    } catch {
      showToast('刪除購物車品項失敗', 'danger');
    }
  };

  const updateQuantity = async (product_id, qty) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/v2/api/${API_PATH}/cart/${product_id}`,
        { data: { product_id, qty } }
      );
      dispatch({ type: "UPDATE_QUANTITY", payload: res.data.data });
      showToast('數量更新成功', 'success');
    } catch {
      showToast('數量更新失敗', 'danger');
    }
  };

  const checkout = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('formData'));
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, {
        data: {
          user: {
            name: userData.name,
            email: userData.email,
            tel: userData.tel,
            address: userData.address || "沒有預設這個欄位"
          },
          message: userData.userMessage || "",
        }
      });

      dispatch({ type: "REMOVE_CART" });
      showToast('訂單已完成', 'success');
      localStorage.clear();
    } catch (error) {
      console.error("訂單失敗", error);
      swal.fire({
        title: "訂單失敗",
        text: "請稍後再試！",
        icon: "error",
      });
    }
  };

  CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <CartContext.Provider
      value={{
        cartList: state.cartList,
        addCartItem,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        removeCart,
        removeCartItem,
        updateQuantity,
        isScreenLoading,
        setIsScreenLoading,
        checkout,
        toastMessage,
        showToast,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
