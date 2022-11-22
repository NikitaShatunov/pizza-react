import React from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { setCats, setFilters } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSceleton from "../components/PizzaBlockSceleton";
import { fetchItems } from "../redux/slices/pizzasFetchSlice";
import NotFoundBlock from "../components/NotFoundBlock";

export default function Home() {
  const navigate = useNavigate();
  const cats = useSelector((state) => state.filter.cats);
  const isAsc = useSelector((state) => state.filter.asc);
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.filter.sort.prop);
  const{status, items }= useSelector((state) => state.pizzas);
  const { searchValue } = useSelector(state => state.filter)

  const params = {sortType, isAsc, cats}

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const list = [
    { name: "популярности", prop: "rating" },
    { name: "цене", prop: "price" },
    { name: "алфавиту", prop: "title" },
  ];

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      let name = "";
      switch (params.prop) {
        case "rating":
          name = "популярности";
          break;
        case "price":
          name = "цене";
          break;
        case "title":
          name = "алфавиту";
          break;
        default:
          break;
      }
      params.sort = {
        name: name,
        prop: params.prop,
      };
      delete params.prop;
      dispatch(
        setFilters({
          ...params,
        })
      );
      isSearch.current = true;
    }
  }, []);

  const onClickCategory = (id) => {
    dispatch(setCats(id));
  };
  const fetchPizzas = async () => {
    dispatch(fetchItems(params))
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [cats, sortType, isAsc]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        prop: sortType,
        cats,
        asc: isAsc,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [cats, sortType, isAsc]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((obj) => (
      <Link key={obj.id} to={`pizza/${obj.id}`}><PizzaBlock
      id={obj.id}
      imageUrl={obj.imageUrl}
      title={obj.title}
      price={obj.price}
      size={obj.sizes}
      type={obj.types}
    /></Link>
    ));

  const skeletons = [...new Array(6)].map((_, i) => (
    <PizzaBlockSceleton key={i} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={cats} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? <NotFoundBlock /> : <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      }
    </div>
  );
}
