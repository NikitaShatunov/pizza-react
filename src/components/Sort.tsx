import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort, setAsc, SortPropEnum } from '../redux/slices/filterSlice'

export default function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state: any) => state.filter.sort);
  const isAsc = useSelector((state: any) => state.filter.asc);
  const [isVisibleSort, setIsVisibleSort] = React.useState(false);  
  const sortRef = React.useRef<HTMLDivElement>(null);
  
  type ListType = {
    name: string;
    prop: SortPropEnum;
  };

  
  const list: ListType[] = [
    { name: "популярности", prop: SortPropEnum.RATING },
    { name: "цене", prop: SortPropEnum.PRICE },
    { name: "алфавиту", prop: SortPropEnum.TITLE },
  ];

  React.useEffect(() => {
    
    const clickOutside = (event: MouseEvent & {composedPath(): EventTarget[]}) => {
      if(sortRef.current && !event.composedPath().includes(sortRef.current)){
        setIsVisibleSort(false);
      }
    }
    document.body.addEventListener('click', clickOutside);

     return () => {
      document.body.removeEventListener('click', clickOutside);
     }
  },[])
  const onClickAsc = (id: boolean) => {
    dispatch(setAsc(id))
  }
  
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div className="asc" onClick={() => onClickAsc(!isAsc)}>
          <svg
            className={isAsc ? "" : "rotate"}
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
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisibleSort(!isVisibleSort)}>
          {sort.name}
        </span>
      </div>
      {isVisibleSort && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                className={sort.prop === obj.prop ? "active" : ""}
                onClick={() => {
                  dispatch(setSort(obj));
                  setIsVisibleSort(!isVisibleSort);
                }}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
