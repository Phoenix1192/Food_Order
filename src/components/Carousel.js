import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
function Carrousel() {
  return (
    <div id="Carousel" style={{"objectFit":"contain !important"}}>
      <div className="containercarousel">
        <Carousel className="h-500" fade>
          <Carousel.Item>
            <img
              className="d-block h-500 w-100 selde"
              style={{"height":"400px", "width":"500px"}}
              src="https://source.unsplash.com/random/800x500/?Soup"
              alt="First slide"
            />

            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <form className="d-flex flex-row">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 selde"
              style={{"height":"400px", "width":"500px"}}
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
                <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 selde"
              style={{"height":"400px", "width":"500px"}}
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
                <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Carrousel;
