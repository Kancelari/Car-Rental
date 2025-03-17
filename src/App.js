
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCar from './cars/AddCar';
import EditCar from './cars/EditCar';
import ViewCar from './cars/ViewCar';
import AddReservation from './cars/AddReservation';
import AddClient from './cars/AddClient';
import Footer from './layout/Footer';
import ViewAllClients from './cars/ViewAllClients';
import EditClient from './cars/EditClient';
import ViewClient from './cars/ViewClient';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/save" element={<AddCar/>} />
          <Route exact path="/view/:id" element={<ViewCar/>} />
          <Route exact path="/:carId" element={<EditCar/>} />
          <Route exact path="/save/:carId" element={<AddReservation/>} />
          <Route exact path="/saveClient" element={<AddClient/>} />
          <Route exact path="/viewAllClients" element={<ViewAllClients/>} />
          <Route exact path="/editClients/:clientId" element={<EditClient/>} />
          <Route exact path="/viewClient/:clientId" element={<ViewClient/>} />
        </Routes>
        </div>
        <Footer className="footer" />
      </Router>
    </div>
  );
}


export default App;