import React, { useState, useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import Skeleton from "../components/PizzaCard/Skeleton";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://649a7667bf7c145d0238dd8f.mockapi.io/pizzas")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, i) => {
              return <Skeleton key={i} />;
            })
          : items.map((item) => {
              return <PizzaCard key={item.id} {...item} />;
            })}
      </div>
    </>
  );
}

export default Home;
