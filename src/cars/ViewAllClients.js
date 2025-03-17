import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEye, faEdit, faTrash, faStar, faSave } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams  } from "react-router-dom";

export default function ViewAllClients() {
  const [clients, setClient] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    loadClient();
    console.log("React Tutorial");
  }, []);

  const loadClient = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/clients/findAll");
      setClient(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error loading clients:", error);
    }
  };

  const deleteClient = async (id) => {
    await axios.delete(`http://localhost:8080/api/clients/deleteById/${id}`);
    loadClient();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="table-responsive">
          <table className="table border shadow">
            <thead className="table-header">
              <tr>
                <th scope="col">Nr</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Age</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                  <th scope="row">{index + 1}</th>
                  <td>{client.firstname}</td>
                  <td>{client.surname}</td>
                  <td>{client.email}</td>
                  <td>{client.phone_number}</td>
                  <td>{client.age}</td>
                  <td>
                    <Link className="btn btn-primary mx-2" to={`/viewClient/${client.id}`}style={{backgroundColor: "#9400D3", borderColor: "#9400D3",}} >
                      <FontAwesomeIcon icon={faEye} /> View
                    </Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/editClients/${client.id}`}style={{color: "#9400D3", borderColor: "#9400D3" }}>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </Link>
                    <button className="btn btn-primary mx-2" style={{backgroundColor: "#9400D3", borderColor: "#9400D3", }}onClick={() => deleteClient(client.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link className="btn btn-primary mx-2" style={{ backgroundColor: '#9400D3', borderColor: '#9400D3' }} to="/">
                <FontAwesomeIcon icon={faHome} className="me-2" /> Back to Home
          </Link>
          <Link className="btn btn-primary mx-2" style={{ backgroundColor: '#9400D3', borderColor: '#9400D3' }} to="/saveClient">
                <FontAwesomeIcon icon={faSave} className="me-2" /> Add Client
          </Link>
        </div>
      </div>
    </div>
  );
}
