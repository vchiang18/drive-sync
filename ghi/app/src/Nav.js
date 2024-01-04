import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          DriveSync
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-wrap">
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers">
                Manufacturers
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/manufacturers/create">
                Create a Manufacturer
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/models">
                Models
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/models/create">
                Create a Model
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/automobiles/">
                Automobiles
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/automobiles/create">
                Create an Automobile
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/salespeople/">
                Salespeople
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/salespeople/add">
                Add a Salesperson
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/customers/">
                Customers
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/customers/add">
                Add a Customer
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/sales/">
                Sales History
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/sales/add">
                Add a Sale
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/technicians/">
                Technicians
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/technicians/create">
                Add a Technician
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/appointments/">
                Service Appointments
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/appointments/create">
                Create a Service Appointment
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/appointments/history">
                Service History
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
