import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

const CarDetails = () => {
  const [car, setCar] = useState("");
  const { carId } = useParams();
  const { addToCart, cartItems, setShowOrderPage } = useGlobalContext();

  const fetchCar = async () => {
    try {
      const response = await fetch(
        `https://buy-tokunbo-cars.herokuapp.com/cars/${carId}`
      );
      const data = await response.json();
      const { car, status } = data;
      if (status === "success") {
        setCar(car);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCar();

    //eslint-disable-next-line
  }, []);
  const { name, image, price } = car;

  const handleAddToCart = async () => {
    if (!cartItems.includes(carId)) {
      await addToCart(carId);
    }
    setShowOrderPage(true);
  };

  return (
    <section className="section details">
      <button className="btn btn-details">
        <Link className="btn-link" to="/products">
          Back To Products
        </Link>
      </button>
      <section className="details-cont">
        <img src={image} alt={name} />
        <article className="details-article">
          <h1 className="details-article-name">{name}</h1>
          <h3 className="details-article-price">${price}</h3>
          <p className="details-article-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            enim impedit distinctio officiis repudiandae aliquam illo laudantium
            deserunt delectus magni asperiores tempora repellendus voluptates,
            error, molestias nisi aspernatur ducimus tempore quam voluptatibus
            dolorum, cupiditate dolor numquam ullam. Quas natus quo quidem nam
            tempora adipisci veniam. Pariatur, atque. Laborum quis excepturi cum
            mollitia placeat nulla beatae error numquam delectus ea laudantium
            rem voluptas dolorem ratione laboriosam saepe ipsam hic facere
            soluta doloremque at consequuntur, voluptate illum reprehenderit.
            Officia repudiandae maxime eius.
          </p>
          <button onClick={handleAddToCart} className="btn btn-add-to-cart">
            {cartItems.includes(carId) ? "ADDED TO CART" : "ADD TO CART"}
          </button>
        </article>
      </section>
    </section>
  );
};

export default CarDetails;
