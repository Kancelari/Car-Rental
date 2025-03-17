import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faCheck, faTimes, faPhone, faKey, faChild, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function AddClient() {
  const navigate = useNavigate();

  const [clientDto, setClientDto] = useState({
    firstname: "",
    surname: "",
    email:"",
    phone_number:"",
    age: "",
    password:"",
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setClientDto({ ...clientDto, [name]: value });
  };

  const { firstname, surname, email, phone_number, age, password} = clientDto;

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/clients/saveClient', clientDto);
      navigate('/');
    } catch (error) {
      console.error('Error occurred while adding client:', error);
      // Handle error scenarios here
    }
  };

  return (
  <div className="container">
    <div className="row">
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h2>Add Client</h2>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="First Name" className="form-label with-shadow">
            <FontAwesomeIcon icon={faUser} className="mr-2" style={{ color: '#9400D3' }} />
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
          <label htmlFor="Surname" className="form-label with-shadow">
            <FontAwesomeIcon icon={faUser} className="mr-2" style={{ color: '#9400D3' }} />
          </label>
          <input
            type="text"
            className="form-control with-shadow custom-input"
            placeholder="Surname"
            name="surname"
            value={surname}
            onChange={(event) => onInputChange(event)}
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="Email" className="form-label with-shadow">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" style={{ color: '#9400D3' }} />
          </label>
          <input
            type="email"
            className="form-control with-shadow custom-input"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(event) => onInputChange(event)}
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="Description" className="form-label with-shadow">
            <FontAwesomeIcon icon={faPhone} className="mr-2" style={{ color: '#9400D3' }} />
          </label>
          <input
            type="text"
            className="form-control with-shadow custom-input"
            placeholder="Phone number"
            name="phone_number"
            value={phone_number}
            onChange={(event) => onInputChange(event)}
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="Description" className="form-label with-shadow">
            <FontAwesomeIcon icon={faChild} className="mr-2" style={{ color: '#9400D3' }} />
          </label>
          <input
            type="age"
            className="form-control with-shadow custom-input"
            placeholder="Age"
            name="age"
            value={age}
            onChange={(event) => onInputChange(event)}
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="Description" className="form-label with-shadow">
            <FontAwesomeIcon icon={faKey} className="mr-2" style={{ color: '#9400D3' }} />
          </label>
          <input
            type="password"
            className="form-control with-shadow custom-input"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event) => onInputChange(event)}
          />
        </div>
        <button
          type="submit" 
          className="btn btn-primary mx-2"
          style={{ backgroundColor: '#9400D3', borderColor: '#9400D3' }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <Link className="btn btn-primary mx-2" style={{ backgroundColor: '#9400D3', borderColor: '#9400D3' }} to="/">
          <FontAwesomeIcon icon={faTimes} />
        </Link>
        <br/>
      </form>
      <br/>
      <Link className="btn btn-primary mx-2" style={{ backgroundColor: '#9400D3', borderColor: '#9400D3' }} to="/viewAllClients">
        <FontAwesomeIcon icon={faEye} /> View All Clients
      </Link>
      <br/>
      </div>
    </div>
    <br/>
  </div>
  );
}
