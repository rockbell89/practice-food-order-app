import "./App.css";
import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layouts/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [isShownCart, setIsShownCart] = useState(false);

  const showCartHandler = () => {
    setIsShownCart(true);
  };

  const hideCartHandler = () => {
    setIsShownCart(false);
  };

  return (
    <>
      <CartProvider>
        {isShownCart && <Cart hideCartHandler={hideCartHandler}></Cart>}
        <Header showCartHandler={showCartHandler}></Header>
        <Meals></Meals>
      </CartProvider>
    </>
  );
}

export default App;
