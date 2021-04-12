import React, { useState, useEffect } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Input, Typography } from "@material-ui/core";

function Customerlist(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [gridApi,setGridApi]=useState(null);
    const [columnApi,setColumnApi]=useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const [customers,setCustomers]=useState([]);
    
    const fetchCustomers= () => {
        fetch('http://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err))

    }

    useEffect(()=>{
        fetchCustomers();
        
    },[]);
    const gridColumns=[
        {field: 'firstname',sortable:true, filter:true},
        {field: 'lastname',sortable:true, filter:true},
        {field: 'email',sortable:true, filter:true},
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
          <Typography variant="h5">Customers</Typography>
          <Input  onChange={filterText} placeholder="Search customers"></Input>
            <AgGridReact
            onGridReady={onGridReady}
            rowData={customers}
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

export default Customerlist;