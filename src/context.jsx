import { useContext, useReducer, createContext, useEffect } from "react";
import  Axios  from "axios";
import reducer from "./reducer";

import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
} from "./action";
import cartItems from "./data";
import { getTotals } from "./utils";
const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {totalAmount ,totalCost} = getTotals(state.cart)

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const remove = (id) => {
    dispatch({ type: REMOVE, id });
  };
  const increase = (id) => {
    dispatch({ type: INCREASE, id });
  };
  const decrease = (id) => {
    dispatch({ type: DECREASE, id });
  };

  return (
    <AppContext.Provider value={{ ...state, clearCart, remove, increase ,decrease,totalAmount,totalCost}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
