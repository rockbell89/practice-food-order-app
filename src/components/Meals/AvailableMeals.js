import React from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealsItem from "./MealsItem";

const AvailableMeals = ({ meals, isLoading, isError }) => {
  const loadingText = (
    <p className={styles["text-center"]}>데이터를 불러오는 중입니다</p>
  );
  const errorText = (
    <p className={[styles["text-center"], styles["text-red"]].join(" ")}>
      데이터를 불러오는데 실패하였습니다
    </p>
  );

  return (
    <section className={styles.meals}>
      <Card>
        {isLoading && loadingText}
        {isError && errorText}
        <ul>
          {meals.map((meal) => (
            <MealsItem key={meal.id} meal={meal}></MealsItem>
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
