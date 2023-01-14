import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout.";

const Cart = ({ hideCartHandler }) => {
  const [didSubmit, setDidSubmit] = useState(false);
  const [isOrder, setIsShowOrder] = useState(false);
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

  const showOrderHandler = () => {
    setIsShowOrder(true);
  };

  const hideOrderHandler = () => {
    setIsShowOrder(false);
  };

  const onComfirmHandler = async (formData) => {
    const res = await fetch(
      "https://react-http-d7df6-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: formData,
          orderItems: ctx.items,
        }),
      }
    );
    if (!res.ok) throw new Error("주문전송에 실패하였습니다");
    const data = await res.json();
    setDidSubmit(true);
    ctx.clearItem();
  };

  const modalContent = (
    <>
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
        <button
          className={classes.button}
          onClick={showOrderHandler}
          disabled={!ctx.items.length}
        >
          Order
        </button>
      </div>
      {isOrder && (
        <Checkout
          onComfirm={onComfirmHandler}
          hideOrderHandler={hideOrderHandler}
        ></Checkout>
      )}
    </>
  );

  const completedOrderContent = <p>주문이 성공적으로 완료 되었습니다</p>;

  return (
    <>
      <Modal hideCartHandler={hideCartHandler}>
        {!didSubmit ? modalContent : completedOrderContent}
      </Modal>
    </>
  );
};

export default Cart;
