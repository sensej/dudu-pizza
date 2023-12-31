import React, { useEffect, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setActiveCategoryId, setFilters } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort, { sortItems } from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import Skeleton from "../components/PizzaCard/Skeleton";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { SearchParams } from "../redux/slices/pizzaSlice";

export type Item = {
  category: number;
  id: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

const Home: React.FC = () => {
  const { items, status } = useSelector(
    (state: RootState) => state.pizzaReducer
  );
  const { searchValue } = useSelector(
    (state: RootState) => state.filterReducer
  );
  const { activeCategoryId, sortType } = useSelector(
    (state: RootState) => state.filterReducer
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    const search = window.location.search;

    if (search) {
      const params = qs.parse(search.substring(1)) as unknown as SearchParams;
      const sort = sortItems.find((item) => {
        return item.sortProperty === params.sortBy;
      });

      dispatch(
        setFilters({
          searchValue: params.search,
          activeCategoryId: Number(params.category) || 0,
          sortType: sort || sortItems[0],
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    const getPizzas = async () => {
      const category =
        activeCategoryId === 0 ? "" : `category=${activeCategoryId}`;
      const sortBy = sortType.sortProperty.replace("-", "");
      const order = sortType.sortProperty.includes("-") ? "desc" : "asc";
      const search = searchValue ? `&search=${searchValue}` : "";

      dispatch(fetchPizzas({ category, sortBy, order, search }));
    };

    if (!isSearch.current) {
      getPizzas();
    }

    window.scrollTo(0, 0);

    isSearch.current = false;
  }, [activeCategoryId, sortType, searchValue, dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategoryId,
        sortType: sortType.sortProperty,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategoryId, sortType, navigate]);

  const pizzasItems = items
    .filter((obj: Item) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item: Item) => {
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
          onClickCategory={(value: number) =>
            dispatch(setActiveCategoryId(value))
          }
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
};

export default Home;
