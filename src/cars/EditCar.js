import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faCheck, faTimes, faEdit, faCarOn, faCarAlt, faGasPump } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function EditCar() {
  let navigate = useNavigate();

  const {carId} = useParams()

  const [carDto, setCarDto] = useState({
    model: "",
    type: "",
    year: 0,
    fuel: "",
    clientId: 0,
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setCarDto({ ...carDto, [name]: value });
  };

  const { model, type, year, fuel, clientId } = carDto;


  useEffect(()=>{
    loadCars();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:8080/api/cars/${carId}`, carDto);
    navigate("/");
  };

  const loadCars = async ()=>{
    try {
      const result = await axios.get(`http://localhost:8080/api/cars/view/${carId}`);
      if (result.data) {
        setCarDto(result.data);
      } else {
        // Handle the case where the data is null
        console.error("Car data is null");
      }
    } catch (error) {
      console.error("Error loading cars:", error);
    }
  }

  const [clients, setClients] = useState([]); // Define client state

  useEffect(() => {
    // Fetch clients when the component mounts
    axios
      .get("http://localhost:8080/api/clients/findAll")
      .then((response) => {
        setClients(response.data); // Assuming the clients are returned in an array format
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
            <FontAwesomeIcon icon={faEdit} className="me-2" />
            Edit
          </h2>
          <form onSubmit={(event) => onSubmit(event)}>
            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="First Name" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faCarOn}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="text"
                className="form-control with-shadow custom-input"
                placeholder="Benz"
                name="model"
                value={model}
                onChange={(event) => onInputChange(event)}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Last Name" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faCarAlt}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="text"
                className="form-control with-shadow"
                placeholder="C Class"
                name="type"
                value={type}
                onChange={(event) => onInputChange(event)}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Age" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="number"
                className="form-control with-shadow"
                placeholder="Enter the year of production"
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
                placeholder="Enter the type of fuel"
                name="fuel"
                value={fuel}
                onChange={(event) => onInputChange(event)}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Client" className="form-label with-shadow">
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
                {clients.map((clientItem) => (
                  <option key={clientItem.id} value={clientItem.id}>
                    {clientItem.firstname}{" "}{clientItem.surname}
                    {/* Display clients name instead of ID */}
                  </option>
                ))}
              </select>
            </div>
            <button  className="btn btn-primary mx-2"style={{ backgroundColor: "#9400D3", borderColor: "#9400D3" }}>
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
