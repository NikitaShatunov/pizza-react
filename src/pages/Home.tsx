import React from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { FilterState, setCats, setFilters } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSceleton from "../components/PizzaBlockSceleton";
import { fetchItems, SearchParams } from "../redux/slices/pizzasFetchSlice";
import NotFoundBlock from "../components/NotFoundBlock";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const cats = useSelector((state: any) => state.filter.cats);
  const isAsc = useSelector((state: any) => state.filter.asc);
  const dispatch = useAppDispatch();
  const sortType = useSelector((state: any) => {
    return state.filter.sort
  });
  const{status, items }= useSelector((state: any) => state.pizzas);
  const { searchValue } = useSelector((state: any) => state.filter)

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
      const params = qs.parse(window.location.search.substring(1))
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
      params.sortType = {
        name: name,
        prop: params.prop,
      };
      delete params.prop;
      dispatch(
        setFilters({
          cats: cats,
          sort: sortType,
          asc: isAsc,
          searchValue: searchValue,
        })
      );
      isSearch.current = true;
    }
  }, []);

  const onClickCategory = (id: number) => {
    dispatch(setCats(id));
  };
  const fetchPizzas = async () => {
    dispatch(
       fetchItems(params))
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
        prop: sortType.prop,
        cats,
        asc: isAsc,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [cats, sortType, isAsc]);

  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((obj: any) => (
      <PizzaBlock
      id={obj.id}
      imageUrl={obj.imageUrl}
      title={obj.title}
      price={obj.price}
      size={obj.sizes}
      type={obj.types}
      count={obj.count}
      key={obj.id}
    />
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
export default Home;