import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";

const MealsItem = ({ meal }) => {
  const ctx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    const addItem = {
      id: meal.id,
      name: meal.name,
      description: meal.description,
      price: meal.price,
      amount: amount,
    };
    ctx.addItem(addItem);
  };
  return (
    <div className={classes.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>{meal.price}</div>
      </div>
      <div>
        <MealsItemForm
          mealId={meal.id}
          addToCartHandler={addToCartHandler}
        ></MealsItemForm>
      </div>
    </div>
  );
};

export default MealsItem;
