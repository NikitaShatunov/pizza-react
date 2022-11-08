import React from "react";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";

import { setCats } from '../redux/slices/filterSlice'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSceleton from "../components/PizzaBlockSceleton";
// import Pagination from "../Pagination";

export default function Home() {
  const cats = useSelector((state) => state.filter.cats);
  const isAsc = useSelector((state) => state.filter.asc);
  const dispatch = useDispatch();
  const sortType =  useSelector((state) => state.filter.sort.prop);
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCats(id));
  }

  const [pageId, setPageId] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://636106e067d3b7a0a6bbab86.mockapi.io/pizzas?${
        cats > 0 ? `category=${cats}` : ""
      }&sortBy=${sortType}&order=${isAsc ? "asc" : "desc"}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [cats, sortType, isAsc, pageId]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((obj) => (
      <PizzaBlock
        key={obj.id}
        imageUrl={obj.imageUrl}
        title={obj.title}
        price={obj.price}
        size={obj.sizes}
        type={obj.types}
      />
    ));

  const skeletons = [...new Array(6)].map((_, i) => (
    <PizzaBlockSceleton key={i} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={cats} onClickCategory={onClickCategory} />
        <Sort
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      {/* <Pagination onChangePage={(num) => setPageId(num)}/> */}
    </div>
  );
}
