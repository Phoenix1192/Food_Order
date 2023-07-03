import React, { useState, useRef, useEffect } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceoptions = Object.keys(options);
  let foodItem = props.foodItem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  const handleAddToCart = async () => {
    let food = [];
    let emp = food;
    for (const item of data) {
      if (item.id === props.foodItem._id && item.size === size) {
        food = item;
        break;
      }
    }
    if (food !==emp) {
      console.log(food);
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
     
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };
  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "390px" }}>
      <img
        className="card-img-top"
        src={foodItem.img}
        alt="Card cap"
        style={{ height: "150px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <p className="card-text">This is some important text</p>
        <div className="container  w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => {
              setQty(e.target.value);
            }}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <select
            className="m-2 h-100 bg-success rounded"
            ref={priceRef}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          >
            {priceoptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>

          <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-danger justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
