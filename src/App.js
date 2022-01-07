import React from "react";
import { Article, CTA, Navbar, Brand } from "./components";
import {
  Header,
  WhatGPT3,
  Features,
  Possibility,
  Footer,
  Blog,
} from "./containers";
import "./App.css";

const App = () => {
  return (
    <div className='App'>
      <div className='gradient_bg'>
        <Navbar />
        <Header />
      </div>
      <Brand />
      <WhatGPT3 />
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <Footer />
    </div>
  );
};

export default App;
