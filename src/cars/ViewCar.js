import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { faHome,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ViewCar() {
  const [car, setCar] = useState({
    model: "",
    type: "",
    year: 0,
    fuel: "",
    clientId: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    loadCar();
  }, []);

  const loadCar = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/cars/view/${id}`
    );
    setCar(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2
            className="text-center mb-4"
            style={{
              color: "#9400D3",
              fontSize: "2.5rem",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
             Info about the Car
          </h2>

          <div className="card">
            <div className="card-header">
              Details of Car with id: {id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Model:</b> {car.model}
                </li>
                <li className="list-group-item">
                  <b>Type:</b> {car.type}
                </li>
                <li className="list-group-item">
                  <b>Year:</b> {car.year}
                </li>
                <li className="list-group-item">
                  <b>Fuel:</b> {car.fuel}
                </li>
                <li className="list-group-item">
                  <b>Client:</b> {car.clientName} {car.clientSurname}
                </li>
                <li className="list-group-item">
                  <b>Reservations:</b>
                  {car.reservationDtoList && car.reservationDtoList.length > 0 ? (
                    car.reservationDtoList.map((reservation, reservationIndex) => (
                      <div key={reservationIndex}>
                        <strong>Reservation<br></br></strong>
                          <span>Date from: {reservation.date_from}<br></br></span>
                          <span>Date to: {reservation.date_to}<br></br></span>
                          <span>Price: {reservation.price}$</span>
                      </div>
                    ))
                  ) : (
                    <div>No reservation available</div>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <Link
            className="btn btn-primary mx-2"
            style={{
              backgroundColor: "#9400D3",
              borderColor: "#9400D3",
            }}
            to={"/"}
          >
            <FontAwesomeIcon icon={faHome} className="me-2" />
             Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
