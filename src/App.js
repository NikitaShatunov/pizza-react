import React from "react";
import { Route, Routes } from "react-router-dom";

import "./scss/App.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import PizzaPage from "./pages/PizzaPage";

function App() {
  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/pizza/:id" element={<PizzaPage />}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
