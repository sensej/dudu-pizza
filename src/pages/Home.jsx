import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../App";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import Skeleton from "../components/PizzaCard/Skeleton";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const { searchValue } = useContext(SearchContext);
  const [sortType, setSortType] = useState({
    name: "популярности (возр.)",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);

    const category = activeCategory === 0 ? "" : `category=${activeCategory}`;
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://649a7667bf7c145d0238dd8f.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, sortType, searchValue]);

  const pizzasItems = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => {
      return <PizzaCard key={item.id} {...item} />;
    });
  const skeletonsItems = [...new Array(8)].map((_, i) => {
    return <Skeleton key={i} />;
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={activeCategory}
          onClickCategory={(id) => setActiveCategory(id)}
        />
        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">
        Все <span>пиццы</span>
      </h2>
      <div className="content__items">
        {isLoading ? skeletonsItems : pizzasItems}
      </div>
    </div>
  );
}

export default Home;
