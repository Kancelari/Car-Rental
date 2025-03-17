import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faCalendar, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams, Link } from "react-router-dom";

function AddReservation() {
  const navigate = useNavigate();
  const { carId } = useParams();

  const [reservationDto, setReservationDto] = useState({
    date_from: "",
    date_to: "",
    price: "",
    car_id: carId,
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setReservationDto({ ...reservationDto, [name]: value });
  };

  const { date_from, date_to, price } = reservationDto;

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/reservations/save/${carId}`, reservationDto);
      navigate("/");
    } catch (error) {
      console.error("Error occurred while adding reservations:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-6 p-4 shadow rounded" style={{ background: "#f8f9fa" }}>
        <h2 className="text-center mb-4">Add Reservation</h2>
        <form onSubmit={onSubmit}>
          {/* Date From Input */}
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="date_from" className="form-label me-2">
              <FontAwesomeIcon icon={faCalendar} style={{ color: "#9400D3" }} />
            </label>
            <input
              type="date"
              className="form-control"
              name="date_from"
              value={date_from}
              onChange={onInputChange}
            />
          </div>

          {/* Date To Input */}
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="date_to" className="form-label me-2">
              <FontAwesomeIcon icon={faCalendar} style={{ color: "#9400D3" }} />
            </label>
            <input
              type="date"
              className="form-control"
              name="date_to"
              value={date_to}
              onChange={onInputChange}
            />
          </div>

          {/* Price Input */}
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="price" className="form-label me-2">
              <FontAwesomeIcon icon={faMoneyBill} style={{ color: "#9400D3" }} />
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              name="price"
              value={price}
              onChange={onInputChange}
            />
          </div>

          {/* Buttons */}
          <div className="text-center">
  {/* OK Button */}
  <button className="btn btn-primary mx-2" style={{ backgroundColor: "#9400D3", borderColor: "#9400D3" }}>
    <FontAwesomeIcon icon={faCheck} />
  </button>

  {/* Cancel Button */}
  <Link className="btn btn-primary mx-2" style={{ backgroundColor: "#9400D3", borderColor: "#9400D3" }} to="/">
    <FontAwesomeIcon icon={faTimes} />
  </Link>
</div>

        </form>
      </div>
    </div>
  );
}

export default AddReservation;
