import React from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealsItem from "./MealsItem";

const AvailableMeals = ({ meals }) => {
  return (
    <section className={styles.meals}>
      <Card>
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
