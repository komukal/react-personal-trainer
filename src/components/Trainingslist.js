import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";


import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Input, Typography } from "@material-ui/core";

function Trainingslist() {
  const [gridApi, setGridApi] = useState(null);
  //const [columnApi, setColumnApi] = useState(null);


  const [trainings, setTrainings] = useState([]);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.log(err));
  };
  const deleteTraining = (id) => {
    if (window.confirm("Do you want to delete the training")) {
      const url = 'https://customerrest.herokuapp.com/api/trainings/'+id
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) fetchTrainings();
          else alert("Something went wrong");
        })
        .catch((err) => console.error(err));
    }
  };
  useEffect(() => {
    fetchTrainings();
  }, []);
 /*
  const troubleShooter = (params) => {
    console.log(params);
  };
  */
  const gridColumns = [
    { field: "activity", sortable: true, filter: true },
    {
      width: '100%',

      headerName: "Date",
      field: "date",
      cellRendererFramework: (params) =>
        moment(params.value).format("DD.MM.YYYY HH:mm"),
    },
    {
      width: '120%',
      field: "duration",
      headerName: "Duration (min)",
      sortable: true,
      filter: true,
    },
    {
      width: '110%',
      headerName: "Customer",
      field: "customer",

      cellRendererFramework: (params) => (
        <div>
          {params.value.firstname} {params.value.lastname}
        </div>
      ),
    },

    {
      headerName: "",

      field: "_links.self.href",
      cellRendererFramework: (params) => (
        <IconButton
        onClick={() => deleteTraining(params.data.id)}
        aria-label="delete"
        color="secondary"
        size="small"
      >
        <DeleteIcon />
      </IconButton>
      ),
    },
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
        <Typography variant="h5">Trainings</Typography>
        <Input onChange={filterText} placeholder="Search trainings"></Input>
        <AgGridReact
          onGridReady={onGridReady}
          rowData={trainings}
          columnDefs={gridColumns}
          pagination={true}
          paginationAutoPageSize={true}
          suppressCellSelection={true}
        />
        

      </div>
    </div>
  );
}

export default Trainingslist;
