import React, { useState, useEffect } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Input, Typography } from "@material-ui/core";
import moment from "moment";

function Trainingslist(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [gridApi,setGridApi]=useState(null);
    const [columnApi,setColumnApi]=useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const [trainings,setTrainings]=useState([]);
    
    const fetchTrainings= () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.log(err))

    }

    useEffect(()=>{
        fetchTrainings();
        
    },[]);
    const actionButton=(params)=>{
        console.log(params);
    }
    const gridColumns=[

        {field: 'activity',sortable:true, filter:true},
        {
          headerName:'idk',
          field: 'date',
          cellRendererFramework: params =>
         
              moment(params.value).format('DD.MM.YYYY HH:mm')
            
          
        }, 
        {field: 'duration',headerName:'Duration (min)',sortable:true, filter:true},
        {
          headerName: 'Customer', field: 'customer',

          cellRendererFramework: params =>
           <div>{params.value.firstname} {params.value.lastname}</div>
        },

        { 
            headerName: '',
            
            field: '_links.self.href',
            cellRendererFramework: params =>
            <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Manage
            </Button>
          
          
        }
    ];
    function onGridReady(params){
      setGridApi(params.api);
      setColumnApi(params.columnApi);
    }

    const filterText = (e)=>{
      console.log(e.target.value)
      gridApi.setQuickFilter(e.target.value);
    }
    return(
      <div border={1}>
        
        <div border={1}  className="ag-theme-material"  style={{height:600, width:'60%',margin:'auto'}}>
          <Typography variant="h5">Trainings</Typography>
          <Input  onChange={filterText} placeholder="Search trainings"></Input>
            <AgGridReact
            onGridReady={onGridReady}
            rowData={trainings}
            columnDefs={gridColumns}
            pagination={true}
            paginationAutoPageSize={true}
            suppressCellSelection={true}
          
            />
            <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Edit info</MenuItem>
      </Menu>
        </div>
        </div>
    )
}

export default Trainingslist;