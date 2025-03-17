import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { faHome,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ViewClient() {
  const [client, setClient] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone_number: "",
    age: "",
  });
  const {clientId } = useParams();

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/clients/findById/${clientId}`
    );
    setClient(result.data);
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
             Information about Client
          </h2>

          <div className="card">
            <div className="card-header">
              Details of Client with id: { clientId }
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>First Name:</b> {client.firstname}
                </li>
                <li className="list-group-item">
                  <b>Last Name:</b> {client.surname}
                </li>
                <li className="list-group-item">
                  <b>Email:</b> {client.email}
                </li>
                <li className="list-group-item">
                  <b>Phone Number:</b> {client.phone_number}
                </li>
                <li className="list-group-item">
                  <b>Age:</b> {client.age}
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
            to={"/viewAllClients"}
          >
            <FontAwesomeIcon icon={faHome} className="me-2" />
             Back to All Clients
          </Link>
        </div>
      </div>
      <br/>
    </div>
  );
}
