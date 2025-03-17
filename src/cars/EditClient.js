import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faCheck, faTimes, faEdit, faCarOn, faCarAlt, faGasPump, faEnvelope, faPhone, faChild, faKey } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function EditClient() {
  let navigate = useNavigate();

  const {clientId} = useParams()

  const [clientDto, setClientDto] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone_number: "",
    age: "",
    password:"",
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setClientDto({ ...clientDto, [name]: value });
  };

  const { firstname, surname, email, phone_number, age, password } = clientDto;


  useEffect(()=>{
    loadClient();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:8080/api/clients/update/${clientId}`, clientDto);
    navigate("/viewAllClients");
  };

  const loadClient = async ()=>{
    try {
      const result = await axios.get(`http://localhost:8080/api/clients/findById/${clientId}`);
      if (result.data) {
        setClientDto(result.data);
      } else {
        // Handle the case where the data is null
        console.error("Car data is null");
      }
    } catch (error) {
      console.error("Error loading cars:", error);
    }
  }
  
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
            Edit Client
          </h2>
          <form onSubmit={(event) => onSubmit(event)}>
            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="First Name" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faUser}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="text"
                className="form-control with-shadow custom-input"
                placeholder="Name"
                name="firstname"
                value={firstname}
                onChange={(event) => onInputChange(event)}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Last Name" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faUser}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="text"
                className="form-control with-shadow"
                placeholder="Last Name"
                name="surname"
                value={surname}
                onChange={(event) => onInputChange(event)}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Email" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="email"
                className="form-control with-shadow"
                placeholder="Enter the year of production"
                name="email"
                value={email}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Phone Number" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="text"
                className="form-control with-shadow"
                placeholder="Phone Number"
                name="phone_number"
                value={phone_number}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Age" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faChild}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="number"
                className="form-control with-shadow"
                placeholder="Enter yout age"
                name="age"
                value={age}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="Password" className="form-label with-shadow">
                <FontAwesomeIcon
                  icon={faKey}
                  className="mr-2"
                  style={{ color: "#9400D3" }}
                />
              </label>
              <input
                type="number"
                className="form-control with-shadow"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <button  className="btn btn-primary mx-2"style={{ backgroundColor: "#9400D3", borderColor: "#9400D3" }}>
              <FontAwesomeIcon icon={faCheck} />
            </button>

            <Link className="btn btn-primary mx-2"style={{ backgroundColor: "#9400D3", borderColor: "#9400D3" }} to="/viewAllClients">
              <FontAwesomeIcon icon={faTimes} />
            </Link>
          </form>
        </div>
      </div>
      <br/>
    </div>
  );
}
