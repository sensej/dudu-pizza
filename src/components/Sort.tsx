import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SortTypes, setSortType } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

type SortItem = {
  name: string;
  sortProperty: SortTypes;
};

export const sortItems: SortItem[] = [
  { name: "популярности (возр.)", sortProperty: SortTypes.RATING_ASK },
  { name: "популярности (убыв.)", sortProperty: SortTypes.RATING_DESC },
  { name: "цене (возр.)", sortProperty: SortTypes.PRICE_ASK },
  { name: "цене (убыв.)", sortProperty: SortTypes.PRICE_DESC },
  { name: "алфавиту (возр.)", sortProperty: SortTypes.TITLE_ASK },
  { name: "алфавиту (убыв.)", sortProperty: SortTypes.TITLE_DESC },
];

function Sort() {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const sortType = useSelector(
    (state: RootState) => state.filterReducer.sortType
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
        composedPath: () => Node[];
      };
      const path = _event.composedPath ? _event.composedPath() : _event.path;

      if (sortRef.current && !path.includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        {isOpen ? (
          <svg
            style={{ transform: "rotate(180deg)" }}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        ) : (
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        )}

        <b>Сортировка по:</b>
        <span
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {sortType.name}
        </span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortItems.map((item: SortItem, i: number) => {
              return (
                <li
                  onClick={() => {
                    dispatch(setSortType(item));
                    setIsOpen(false);
                  }}
                  key={i}
                  className={
                    item.sortProperty === sortType.sortProperty ? "active" : ""
                  }
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
