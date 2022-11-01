import logo from "./logo.svg";
import "./scss/App.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import React from "react";
function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://636106e067d3b7a0a6bbab86.mockapi.io/items')
    .then(res => res.json())
    .then(json => setItems(json))
  }, []);
  
  return (
    <div className="App">
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
             {
              items.map((obj) => <PizzaBlock key ={obj.id}
                img = {obj.imageUrl} 
                title = {obj.name} 
                price = {obj.price} 
                size = {obj.sizes}
                type = {obj.types}
                />)
             }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
