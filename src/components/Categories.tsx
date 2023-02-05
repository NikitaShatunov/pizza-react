import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({value, onClickCategory}) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]
 
  return (
    <div className="categories">
      <ul>
        {
          categories.map((cat, key) => <li key = {key} 
          onClick={() => onClickCategory(key)}
          className={value === key ? 'active' : ''}>{cat}</li>)
        }
      </ul>
    </div>
  );
}
export default Categories;