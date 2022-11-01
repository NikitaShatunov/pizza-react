import React from "react";
export default function Categories() {
  const [cats, setCats] = React.useState(0);
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]
  const onClickCats = (i) => {
    setCats(i)
  }
  return (
    <div className="categories">
      <ul>
        {
          categories.map((cat, key) => <li key = {key} 
          onClick={() => onClickCats(key)}
          className={cats === key ? 'active' : ''}>{cat}</li>)
        }
      </ul>
    </div>
  );
}