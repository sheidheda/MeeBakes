import React, { useState } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Base from './components/Base';
import Toppings from './components/Toppings';
import Order from './components/Order';
import Modal from './components/Modal';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [cake, setCake] = useState({ base: "", toppings: [] });
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const addBase = (base) => {
    setCake({ ...cake, base })
  }
  
  const addTopping = (topping) => {
    let newToppings;
    if(!cake.toppings.includes(topping)){
      newToppings = [...cake.toppings, topping];
    } else {
      newToppings = cake.toppings.filter(item => item !== topping);
    }
    setCake({ ...cake, toppings: newToppings });
  }

  return (
    <>
    <Header />
    <Modal showModal={showModal} />
    <AnimatePresence exitBeforeEnter onExitComplete={() => setShowModal(false)}>
      <Routes location={location} key={location.key}>
        <Route path="/base" element = {<Base addBase={addBase} cake={cake} />} />
          
         
        <Route path="/toppings" element = {<Toppings addTopping={addTopping} cake={cake} />} />
          
        
        <Route path="/order" element = {<Order cake={cake} setShowModal={setShowModal} />} />
          
         
        <Route path="/" element = {<Home />} />
          
         
      </Routes>
    </AnimatePresence>
  </>
  );
}

export default App;
