import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button } from '@mui/material';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const TableComponent = ({ data, onEdit }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleViewDetails = (row) => {
    navigate(`/details/${row.ID}`, { state: { row } });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} style={{ maxHeight: 500, overflowY: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={{ paddingLeft: '3rem' }}>View</TableCell>
            <TableCell style={{ paddingLeft: '3rem' }}>Edit</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Delivery Person ID</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Restaurant Latitude</TableCell>
            <TableCell>Restaurant Longitude</TableCell>
            <TableCell>Delivery Latitude</TableCell>
            <TableCell>Delivery Longitude</TableCell>   
            <TableCell>Order Date</TableCell>     
            <TableCell>Time Ordered</TableCell>
            <TableCell>Time Picked</TableCell>
            <TableCell>Weather</TableCell>
            <TableCell>Traffic</TableCell>
            <TableCell>Vehicle Condition</TableCell>
            <TableCell>Order Type</TableCell>
            <TableCell>Vehicle Type</TableCell>
            <TableCell>Multiple Deliveries</TableCell>
            <TableCell>Festival</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Time Taken (min)</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>        
        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
              <Button type="submit" variant = "outlined" color="success" onClick={() => handleViewDetails(row)} className = "cumulativeItems">View Me</Button>
              </TableCell>
              <TableCell>
              <Button type="submit" variant = "outlined" color="error" onClick={() => onEdit(row)} className = "cumulativeItems">Edit Me</Button>
              </TableCell>
              <TableCell>{row.ID}</TableCell>
              <TableCell>{row.Delivery_person_ID}</TableCell>
              <TableCell>{row.Delivery_person_Age}</TableCell>            
              <TableCell>{row.Restaurant_latitude}</TableCell>
              <TableCell>{row.Restaurant_longitude}</TableCell>
              <TableCell>{row.Delivery_location_latitude}</TableCell>
              <TableCell>{row.Delivery_location_longitude}</TableCell>
              <TableCell>{row.Order_Date}</TableCell>
              <TableCell>{row.Time_Orderd}</TableCell>
              <TableCell>{row.Time_Order_picked}</TableCell>
              <TableCell>{row.Weather_conditions}</TableCell>
              <TableCell>{row.Road_traffic_density}</TableCell>
              <TableCell>{row.Vehicle_condition}</TableCell>
              <TableCell>{row.Type_of_order}</TableCell>
              <TableCell>{row.Type_of_vehicle}</TableCell>
              <TableCell>{row.multiple_deliveries}</TableCell>
              <TableCell>{row.Festival}</TableCell>
              <TableCell>{row.City}</TableCell>
              <TableCell>{row.Time_taken_min}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default TableComponent;
