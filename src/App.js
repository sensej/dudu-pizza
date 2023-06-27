import { useState, useEffect } from "react";

import "./scss/app.scss";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaCard from "./components/PizzaCard";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://649a7667bf7c145d0238dd8f.mockapi.io/pizzas")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((item) => {
              return <PizzaCard key={item.id} {...item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
