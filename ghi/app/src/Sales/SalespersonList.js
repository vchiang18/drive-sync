import React, { useState, useEffect } from "react";

function SalespersonList() {
  const [salespeople, setSalespeople] = useState([]);
  const [search, setSearch] = useState([]);

  const getSalespeople = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salesperson);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSalespeople();
  }, []);

  if (salespeople === undefined) {
    return null;
  }

  return (
    <>
      <h1 className="p-3">Salespeople</h1>

      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search by Salesperson"
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
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {salespeople
            .filter((salesperson) => {
              // const searchTerm = search.toLowerCase();
              return search === ""
                ? salesperson
                : salesperson.last_name.toLowerCase().includes(search);
            })
            .map((salesperson) => {
              return (
                <tr key={salesperson.employee_id}>
                  <td>{salesperson.employee_id}</td>
                  <td>{salesperson.first_name}</td>
                  <td>{salesperson.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default SalespersonList;
