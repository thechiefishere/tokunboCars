import React from "react";
import Hero from "./Hero";
import { useGlobalContext } from "../context";
import Car from "./Car";
import Loading from "./Loading";

const Home = () => {
  const { cars, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  const featuredCars = cars.filter((car) => car.featured);

  return (
    <section className="home">
      <Hero />
      <article className="home-products">
        <h2 className="home-products-title">Featured Products</h2>
        <section className="home-products-cars">
          {featuredCars.map((car) => {
            return <Car key={car._id} car={car} />;
          })}
        </section>
      </article>
    </section>
  );
};

export default Home;
