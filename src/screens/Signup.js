import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    // alert("Em")
    // alert(JSON.stringify({
    //     name: credentials.name,
    //     email: credentials.email,
    //     password: credentials.password,
    //     location: credentials.geolocation
    //   }))
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({ name: credentials.name,email: credentials.email,
password: credentials.password, location: credentials.geolocation
      })
    });
   
    
    const json = await response.json();
    if (json.success === false) {
        alert("Enter Proper Credentials")
        // console.log(json)
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={credentials.email}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">
              Address
            </label>
            <input
              className="form-control"
              name="geolocation"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/Login" className="m-3 btn btn-danger">
            Already a User?
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
