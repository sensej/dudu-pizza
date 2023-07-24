import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import qs from "qs";
import { SearchContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategoryId, setFilters } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort, { sortItems } from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import Skeleton from "../components/PizzaCard/Skeleton";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);
  const { activeCategoryId, sortType } = useSelector(
    (state) => state.filterReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    const search = window.location.search;

    if (search) {
      const params = qs.parse(search.substring(1));
      const sort = sortItems.find((item) => {
        return item.sortProperty === params.sortType;
      });

      dispatch(
        setFilters({
          ...params,
          sortType: sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      setIsLoading(true);

      const category =
        activeCategoryId === 0 ? "" : `category=${activeCategoryId}`;
      const sortBy = sortType.sortProperty.replace("-", "");
      const order = sortType.sortProperty.includes("-") ? "desc" : "asc";
      const search = searchValue ? `&search=${searchValue}` : "";

      axios
        .get(
          `https://649a7667bf7c145d0238dd8f.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
    }

    isSearch.current = false;
  }, [activeCategoryId, sortType, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategoryId,
        sortType: sortType.sortProperty,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategoryId, sortType]);

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
          value={activeCategoryId}
          onClickCategory={(value) => dispatch(setActiveCategoryId(value))}
        />
        <Sort />
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
