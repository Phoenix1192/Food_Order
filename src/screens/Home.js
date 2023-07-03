import React, { useState, useEffect } from "react";
import Navbarr from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Carousel from "react-bootstrap/Carousel";
// import Carrousel from "../components/Carousel";
export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [search,setSearch] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);
    // console.log(response[0],response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbarr></Navbarr>
      </div>
      <div id="Carousel" style={{ objectFit: "contain !important" }}>
        <div className="containercarousel">
          <Carousel className="h-500" fade>
            <Carousel.Item>
              <img
                className="d-block h-500 w-100 selde"
                style={{ height: "400px", width: "500px", filter: "brightness(30%)" }}
                src="https://source.unsplash.com/random/800x500/?Soup"
                alt="First slide"
              />

              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <form className="d-flex flex-row justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e)=>{setSearch(e.target.value)}}
                    value = {search}
                  />
                  {/* <button
                    className="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </form>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 selde"
                style={{ height: "400px", width: "500px" ,filter: "brightness(30%)" }}
                src="https://source.unsplash.com/random/800x500/?Food"
                alt="Second slide"
              />
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <form className="d-flex flex-row">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  {/* <button
                    className="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </form>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 selde"
                style={{ height: "400px", width: "500px" ,filter: "brightness(30%)"}}
                src="https://source.unsplash.com/random/800x500/?CheeseBurger"
                alt="Third slide"
              />
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <form className="d-flex flex-row">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  {/* <button
                    className="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </form>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <div className="Container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data.id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr></hr>
                {foodItem !== [] ? (
                  foodItem
                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toString().toLocaleLowerCase()))
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem = {filterItems}
                            options={filterItems.options[0]}
                            
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>No Such Data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>.</div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
