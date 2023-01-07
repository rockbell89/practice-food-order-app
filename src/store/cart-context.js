import React from "react";

const CartContext = React.createContext({
  // 초기화
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
