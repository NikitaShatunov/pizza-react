import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSceleton from "../components/PizzaBlockSceleton";

export default function Home() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://636106e067d3b7a0a6bbab86.mockapi.io/items')
    .then(res => res.json())
    .then(json => {
      setItems(json);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, []);
 return(
    <div className="container">
      <div className="content__top">
    <Categories />
    <Sort />
  </div>
  <h2 className="content__title">Все пиццы</h2>
  <div className="content__items">
   {
    isLoading ? [...new Array(6)].map((_, i) => <PizzaBlockSceleton key={i} />) 
    : items.map((obj) =><PizzaBlock key ={obj.id}
      img = {obj.imageUrl} 
      title = {obj.name} 
      price = {obj.price} 
      size = {obj.sizes}
      type = {obj.types}
      />)
   }
  </div>
    </div>
  
 )
}