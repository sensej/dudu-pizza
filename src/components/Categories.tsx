import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              onClick={() => onClickCategory(i)}
              key={i}
              className={value === i ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
