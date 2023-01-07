import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = ({ showCartHandler }) => {
  const ctx = useContext(CartContext);
  const [btnEffectAactive, setBtnEffectAactive] = useState(false);
  const btnClasses = `${classes.button} ${
    btnEffectAactive ? classes.bump : ""
  }`;
  useEffect(() => {
    setBtnEffectAactive(true);
    const timer = setTimeout(() => {
      setBtnEffectAactive(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);

  const onClick = () => {
    showCartHandler();
  };
  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>장바구니</span>
      <span className={classes.badge}>{ctx.items.length}</span>
    </button>
  );
};

export default HeaderCartButton;
