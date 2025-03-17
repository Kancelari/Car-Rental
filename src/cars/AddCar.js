import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faCalendar, faCheck, faTimes, faCarOn, faCarAlt, faGasPump} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function AddCar() {
  const navigate = useNavigate();

  const [carDto, setCarDto] = useState({
    model: "",
    type: "",
    year: "",
    fuel: "",
    clientId: 0,
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setCarDto({ ...carDto, [name]: value });
  };

  const { model, type, year, fuel, clientId} = carDto;

    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post("http://localhost:8080/api/cars/save", carDto);
        navigate("/");
      } catch (error) {
        console.error("Error adding car:", error);
      }
    };

  const [client, setClients] = useState([]); 

  useEffect(() => {
   
    axios
      .get("http://localhost:8080/api/clients/findAll")
      .then((response) => {
        setClients(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);
  
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
             Car Form
          </h2>
          <form onSubmit={(event) => onSubmit(event)}>
            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Model" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faCarOn}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="text"
                className="form-control with-shadow custom-input"
                placeholder="Model"
                name="model"
                value={model}
                onChange={(event) => onInputChange(event)}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Type" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faCarAlt}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="text"
                className="form-control with-shadow"
                placeholder="Type"
                name="type"
                value={type}
                onChange={(event) => onInputChange(event)}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Year" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="number"
                className="form-control with-shadow"
                placeholder="Year of production"
                name="year"
                value={year}
                onChange={(event) => onInputChange(event)}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Fuel" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faGasPump}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="text"
                className="form-control with-shadow"
                placeholder="Fuel of the car"
                name="fuel"
                value={fuel}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Category" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faUser}
                  className="mr-2"
                  
                  style={{ color: "#9400D3" }}
                />
              </label>
              <select
                className="form-control with-shadow"
                name="clientId" // Update name attribute to match the state key
                value={clientId}
                onChange={(event) => onInputChange(event)}
              >
                <option value="">Select client...</option>
                {client.map((clientItem) => (
                  <option key={clientItem.id} value={clientItem.id}>
                    {clientItem.firstname}{" "}
                    {clientItem.surname}
                  </option>
                ))}
              </select>
            </div>
            <button  type="submit" className="btn btn-primary mx-2"style={{ backgroundColor: "#9400D3", borderColor: "#9400D3" }}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
            
            <Link className="btn btn-primary mx-2"style={{ backgroundColor: "#9400D3", borderColor: "#9400D3" }} to="/">
              <FontAwesomeIcon icon={faTimes} />
            </Link>
          </form>
        </div>
      </div>
      <br/>
    </div>
  );
}
