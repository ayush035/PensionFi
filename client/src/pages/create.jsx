import React from "react";
import { Navbar, Footer, } from "../components";

const create = () => (
  <div className="w-full gradient-bg-welcome">
    <Navbar />
    <div className="text-4xl text-center text-white font-bold mt-10 mb-20">
      <h1> Account Creation Page </h1>
    </div>
    <Footer />
  </div>
);

export default create;

