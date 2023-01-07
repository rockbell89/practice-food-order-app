import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = ({ hideCartHandler }) => {
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const cancelHandler = () => {
    hideCartHandler();
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  return (
    <>
      <Modal hideCartHandler={hideCartHandler}>
        <ul className={classes["cart-items"]}>
          {ctx.items.map((item) => (
            <CartItem
              item={item}
              key={item.id}
              cartItemAddHandler={cartItemAddHandler.bind(null, item)}
              cartItemRemoveHandler={cartItemRemoveHandler.bind(null, item.id)}
            ></CartItem>
          ))}
        </ul>
        <div className={classes.total}>
          <span>Total</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={cancelHandler}>
            Cancel
          </button>
          <button className={classes.button}>Order</button>
        </div>
      </Modal>
    </>
  );
};

export default Cart;
