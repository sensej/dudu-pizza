import React, { useEffect, useRef } from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategoryId, setFilters } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort, { sortItems } from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import Skeleton from "../components/PizzaCard/Skeleton";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

function Home() {
  const { items, status } = useSelector((state) => state.pizzaReducer);
  const { searchValue } = useSelector((state) => state.filterReducer);
  const { activeCategoryId, sortType } = useSelector(
    (state) => state.filterReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {
    const category =
      activeCategoryId === 0 ? "" : `category=${activeCategoryId}`;
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchPizzas({ category, sortBy, order, search }));
  };

  useEffect(() => {
    const search = location.search;

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
    if (!isSearch.current) {
      getPizzas();
    }

    window.scrollTo(0, 0);

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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletonsItems : pizzasItems}
        </div>
      )}
    </div>
  );
}

export default Home;
