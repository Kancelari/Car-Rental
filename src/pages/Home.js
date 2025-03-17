import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams  } from "react-router-dom";

export default function Home() {
  const [cars, setCars] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    loadCars();
    console.log("Loading Cars");
  }, []);

  const loadCars = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/cars");
      setCars(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error loading cars:", error);
    }
  };

  const deleteCar = async (id) => {
    await axios.delete(`http://localhost:8080/api/cars/${id}`);
    loadCars();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="table-responsive">
          <table className="table border shadow">
            <thead className="table-header">
              <tr>
                <th scope="col">Nr</th>
                <th scope="col">Model</th>
                <th scope="col">Type</th>
                <th scope="col">Year</th>
                <th scope="col">Fuel</th>
                <th scope="col">Client</th>
                <th scope="col">Reservations</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                  <th scope="row">{index + 1}</th>
                  <td>{car.model}</td>
                  <td>{car.type}</td>
                  <td>{car.year}</td>
                  <td>{car.fuel}</td>
                  <td>{car.clientName} {car.clientSurname}</td>
                  <td>
                    {car.reservationDtoList &&
                    car.reservationDtoList.length > 0 ? (
                        car.reservationDtoList.map((reservation, reservationIndex) => (
                        <div key={reservationIndex}>
                          <strong>Reservation<br></br></strong>
                          <span>Date from: {reservation.date_from}<br></br></span>
                          <span>Date to: {reservation.date_to}<br></br></span>
                          <span>Price: {reservation.price}$</span>
                        </div>
                      ))
                    ) : (<div>No reservation available</div>)}
                  </td>
                  <td>
                    <Link className="btn btn-primary mx-2" to={`/view/${car.id}`}style={{backgroundColor: "#9400D3", borderColor: "#9400D3",}} >
                      <FontAwesomeIcon icon={faEye} /> View
                    </Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/${car.id}`}style={{color: "#9400D3", borderColor: "#9400D3" }}>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </Link>
                    <button className="btn btn-primary mx-2" style={{backgroundColor: "#9400D3", borderColor: "#9400D3", }}onClick={() => deleteCar(car.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Link className="btn btn-outline-primary mx-2" to={`/save/${car.id}`} style={{ color: "#9400D3", borderColor: "#9400D3" }} >
                      <FontAwesomeIcon icon={faStar} /> Reservation
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
