import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0, // 총 금액??
};

const cartReducer = (state = initialState, action) => {
  // 이미 존재하는 아이템

  switch (action.type) {
    case "ADD_ITEM": {
      let updatedItems;
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      const exitingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const exitingCartItem = state.items[exitingCartItemIndex];
      if (exitingCartItem) {
        const updatedItem = {
          ...exitingCartItem,
          amount: exitingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items]; // 불변성
        updatedItems[exitingCartItemIndex] = updatedItem;
      } else {
        // 신규 아이템
        updatedItems = state.items.concat(action.payload);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "REMOVE_ITEM": {
      let updatedItems;
      const removedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const removedItem = state.items[removedItemIndex];
      const updatedTotalAmount = state.totalAmount - removedItem.price;
      if (removedItem) {
        // 수량이 1개 남아있으면 리스트에서 제거
        if (removedItem.amount === 1) {
          updatedItems = state.items.filter(
            (item) => item.id !== action.payload
          );
        } else {
          const updatedItem = {
            ...removedItem,
            amount: removedItem.amount - 1,
          };
          updatedItems = [...state.items]; // 불변성
          updatedItems[removedItemIndex] = updatedItem;
        }
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemHandler = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItemHandler = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const context = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
