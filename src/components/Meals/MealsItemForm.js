import React, { useRef, useState } from "react";
import Input from "../UI/Input";
import classes from "./MealsItemForm.module.css";

const MealsItemForm = ({ mealId, addToCartHandler }) => {
  const amountInputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const inputAmount = amountInputRef.current.value;
    addToCartHandler(+inputAmount);
    if (
      inputAmount.trim().length === 0 ||
      +inputAmount < 1 ||
      +inputAmount > 5
    ) {
      setIsAmountValid(false);
    } else {
      setIsAmountValid(true);
    }
  };
  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          ref={amountInputRef}
          label="Amount"
          input={{
            id: `amount_${mealId}`,
            type: "number",
            min: "1",
            max: "5",
            defaultValue: "1",
            step: "1",
          }}
        />
        <button type="submit">+ ADD</button>
        {!isAmountValid && (
          <p>정확한 수량을 입력해주세요 (최소 1 ~ 최대 5 가능)</p>
        )}
      </form>
    </>
  );
};

export default MealsItemForm;
