import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);
      setMeals([]);
      const res = await fetch(
        "https://react-http-d7df6-default-rtdb.firebaseio.com/meals.json"
      );
      if (!res.ok) {
        throw new Error("데이터를 가져오는데 실패했습니다");
      }
      const data = await res.json();

      const transformData = [];
      for (const key in data) {
        transformData.push({
          id: key,
          name: data[key].name,
          price: data[key].price,
          description: data[key].description,
        });
      }

      setMeals(transformData);
      setIsLoading(false);
    };

    fetchMeals()
      .then()
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });

    return () => {};
  }, []);

  const rederData = (
    <AvailableMeals
      meals={meals}
      isLoading={isLoading}
      isError={error}
    ></AvailableMeals>
  );

  return (
    <div>
      <MealsSummary></MealsSummary>

      {rederData}
    </div>
  );
};

export default Meals;
