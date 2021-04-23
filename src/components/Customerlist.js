import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import EditCustomer from "./EditCustomer";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Input, Typography } from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
function Customerlist() {
  const [gridApi, setGridApi] = useState(null);
  //const [columnApi, setColumnApi] = useState(null);

  const [customers, setCustomers] = useState([]);

  const fetchCustomers = () => {
    fetch("http://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.log(err));
  };

  const addCustomer = (newCustomer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      body: JSON.stringify(newCustomer),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
        } else {
          alert("something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const addCustomerTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      body: JSON.stringify(training),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
        } else {
          alert("something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

 const editCustomer = (url, customerData) => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(customerData),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) fetchCustomers();
        else alert("Something went wrong");
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Do you want to delete this customer")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) fetchCustomers();
          else alert("Something went wrong");
        })
        .catch((err) => console.error(err));
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  // const troubleShooter = (params) => {
  // console.log(params);
  //};
  const gridColumns = [
    {
      headerName: "Trainings",
      field: "links",
      cellRendererFramework: (params) => (
        <div>
          <AddTraining
            addCustomerTraining={addCustomerTraining}
            customerLink = {params.value[0].href}
          />
        </div>
      ),
    },
    { field: "firstname", sortable: true,  },
    { field: "lastname", sortable: true,  },
    { field: "email", sortable: true,  width:100},
    {
      headerName: "Edit",
      width: 100,
      field: "links",
      cellRendererFramework: (params) => (
        <div>
          <EditCustomer
            customer={params.data}
            link={params.value[0].href}
            edit={editCustomer}
          />
        </div>
      ),
    },
    {
      headerName: "Delete",
      width: 100,
      field: "links",
      cellRendererFramework: (params) => (
        <div>
          <IconButton
            onClick={() => deleteCustomer(params.value[0].href)}
            aria-label="delete"
            color="secondary"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
    { field: "streetaddress", sortable: true  },
    { field: "postcode", sortable: true, width:100 },
    { field: "phone", sortable: true },
  ];
  function onGridReady(params) {
    setGridApi(params.api);
    //setColumnApi(params.columnApi);
  }

  const filterText = (e) => {
    console.log(e.target.value);
    gridApi.setQuickFilter(e.target.value);
  };
  return (
    <div border={1}>
      <div
        border={1}
        className="ag-theme-material"
        style={{ height: 600, width: "60%", margin: "auto" }}
      >
        <Typography variant="h5">Customers</Typography>
        <Input onChange={filterText} placeholder="Search customers"></Input>
        <AddCustomer addCustomer={addCustomer} />
        <AgGridReact
          onGridReady={onGridReady}
          rowData={customers}
          columnDefs={gridColumns}
          pagination={true}
          paginationAutoPageSize={true}
          suppressCellSelection={true}
        />
      </div>
    </div>
  );
}

export default Customerlist;
