import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, Input, Typography } from "@material-ui/core";

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
  const troubleShooter = (params) => {
    console.log(params);
  };
  const gridColumns = [
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    {
      headerName: "Actions",

      field: "links",
      cellRendererFramework: (params) => (
        <div>
          

          <IconButton
            onClick={() => troubleShooter(params.value[0].href)}
            aria-label="edit"
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>

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
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },


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
