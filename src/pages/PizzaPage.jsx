import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PizzaPage () {
    const [pizza, setPizza] = React.useState();
    const {id} = useParams();
    const navigate = useNavigate();
    React.useEffect(() => {
        async function fetch() {
           try {
            const {data} = await axios.get(`https://636106e067d3b7a0a6bbab86.mockapi.io/pizzas/` + id);
            setPizza(data);
           }
           catch (erorr){
            alert("Eror")
            navigate('/')
           }
        }
        fetch();
    },[]);
    if (!pizza) {
       return <div>loading</div>
    }
    return(
        <div className="container">
        <h1>{pizza.title}</h1>
        <img src={pizza.imageUrl} alt="" />
        <h2>{pizza.price} ₴</h2>
        </div>
    )
}
