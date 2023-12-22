import React, { useState, useEffect } from "react";

function SalesForm() {
  const [autos, setAutos] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [price, setPrice] = useState("");
  const [auto, setAuto] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [customer, setCustomer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSold = async (vin) => {
    const url = `http://localhost:8100/api/automobiles/${vin}/`;
    const fetchConfig = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sold: true }),
    };
    const soldAuto = await fetch(url, fetchConfig);
  };

  const fetchAutos = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const filtered = data.autos.filter((auto) => {
        return auto.sold === false;
      });
      setAutos(filtered);
    } else {
      console.error(response.status);
    }
  };

  const fetchSalespeople = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salesperson);
    } else {
      console.error(response.status);
    }
  };

  const fetchCustomers = async () => {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    } else {
      console.error(response.status);
    }
  };

  useEffect(() => {
    fetchAutos();
    fetchSalespeople();
    fetchCustomers();
  }, []);

  const submittedMessage = submitted
    ? "alert alert-success mb-0"
    : "alert alert-success d-none mb-0";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8090/api/sales/";

    const data = {};
    data.automobile = auto;
    data.salesperson = salesperson;
    data.customer = customer;
    data.price = price;

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newSale = await response.json();
      handleSold(data.automobile);
      setAuto("");
      setSalesperson("");
      setCustomer("");
      setPrice("");
      setSubmitted(true);
    } else {
      console.error(response.status);
    }
  };

  const handleAutoChange = (e) => {
    const value = e.target.value;
    setAuto(value);
  };

  const handleSalespersonChange = (e) => {
    const value = e.target.value;
    setSalesperson(value);
  };

  const handleCustomerChange = (e) => {
    const value = e.target.value;
    setCustomer(value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a New Sale</h1>
            <form onSubmit={handleSubmit} id="create-sales-form">
              <div className="form-floating mb-3">
                <select
                  onChange={handleAutoChange}
                  required
                  name="automobile"
                  id="automobile"
                  value={auto}
                  className="form-select"
                >
                  <option>Choose Auto VIN</option>
                  {autos.map((auto) => {
                    return (
                      <option key={auto.vin} value={auto.vin}>
                        {auto.vin}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select
                  onChange={handleSalespersonChange}
                  required
                  name="salesperson"
                  id="salesperson"
                  value={salesperson}
                  className="form-select"
                >
                  <option>Choose Salesperson</option>
                  {salespeople.map((salesperson) => {
                    return (
                      <option
                        key={salesperson.employee_id}
                        value={salesperson.employee_id}
                      >
                        {salesperson.first_name} {salesperson.last_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select
                  onChange={handleCustomerChange}
                  required
                  name="customer"
                  id="customer"
                  value={customer}
                  className="form-select"
                >
                  <option>Choose Customer</option>
                  {customers.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handlePriceChange}
                  placeholder="price"
                  required
                  type="number"
                  value={price}
                  name="price"
                  id="price"
                  className="form-control"
                />
                <label htmlFor="price">Price</label>
              </div>
              <button className="btn btn-primary mb-3">Add</button>
            </form>
            <div className={submittedMessage}>Success! Sales added.</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesForm;
