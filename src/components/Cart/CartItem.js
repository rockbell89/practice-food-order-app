import React from "react";
import classes from "./CartItem.module.css";
const CartItem = ({ item, cartItemRemoveHandler, cartItemAddHandler }) => {
  const price = `$${item.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div className={classes.summary}>
        <div>
          <h2>{item.name}</h2>
          <div className={classes.price}>{price}</div>
        </div>
        <div className={classes.amount}>{item.amount}</div>
      </div>
      <div className={classes.actions}>
        <button onClick={cartItemRemoveHandler}>-</button>
        <button onClick={cartItemAddHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
