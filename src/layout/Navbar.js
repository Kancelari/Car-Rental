import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPeopleLine} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#9400D3" }}>
        <div className="container-fluid justify-content-center">
          <div className="d-flex align-items-center">
            <Link className="btn btn-outline-light me-3" to="/saveClient">
              <FontAwesomeIcon icon={faPeopleLine} className="me-2" />
              Add Client
            </Link>
          </div>
          <Link className="navbar-brand mx-auto" to="/" style={{ fontFamily: "Arial, sans-serif" }}>
          <FontAwesomeIcon icon={faCar} className="me-2" />
            Car Rental Application
          </Link>
          <Link className="btn btn-outline-light" to="/save">
            <FontAwesomeIcon icon={faCar} className="me-2" /> Add Car
          </Link>
        </div>
      </nav>
    </div>
  );
}

