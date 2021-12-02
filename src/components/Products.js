import React from "react";
import { useGlobalContext } from "../context";
import Loading from "./Loading";
import Car from "./Car";

const Products = () => {
  const { cars, loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="section products">
      <h1 className="section-header">Our Products</h1>
      <article className="products-list">
        {cars.map((car) => {
          return <Car key={car._id} car={car} />;
        })}
      </article>
    </section>
  );
};

export default Products;
