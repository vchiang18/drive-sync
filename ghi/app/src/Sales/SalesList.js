import React, { useState, useEffect } from "react";

function SalesList() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");

  const getSales = async () => {
    const url = "http://localhost:8090/api/sales/";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSales(data.sales);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  if (sales === undefined) {
    return null;
  }

  return (
    <>
      <h1 className="p-3">Sales History</h1>

      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search by Salesperson ID"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-success" type="submit">
          Search
        </button>
      </form>

      <table className="table table-striped" id="table">
        <thead>
          <tr>
            <th>Salesperson EE ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales
            .filter((sale) => {
              function fullName() {
                return `${sale.salesperson.first_name} ${sale.salesperson.last_name}`;
              }

              return search === ""
                ? sale
                : fullName().toLowerCase().includes(search);
            })
            .map((sale) => {
              return (
                <tr key={`${sale.id}-${sale.salesperson.employee_id}`}>
                  <td>{sale.salesperson.employee_id}</td>
                  <td>
                    {sale.salesperson.first_name} {sale.salesperson.last_name}
                  </td>
                  <td>
                    {sale.customer.first_name} {sale.customer.last_name}
                  </td>
                  <td>{sale.automobile.vin}</td>
                  <td>{sale.price}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default SalesList;
