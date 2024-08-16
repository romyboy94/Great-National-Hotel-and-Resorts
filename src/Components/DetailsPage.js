import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Paper, Grid, Card, CardContent, CardHeader, Button } from '@mui/material';

const DetailsPage = ({ data }) => {
    const { id } = useParams(); 
    const selectedRow = data.find(row => row.ID === id); 
    const navigatetoHome = useNavigate();
  
    if (!selectedRow) {
      return <Card variant="h6">Data not found</Card>;
    }

    const handleBack = () => {
        // resetData();
        navigatetoHome('/');
    }

  return (
    <div>
<Box my={4}>
<Button className='onlyCard' variant="contained" color="primary" onClick={handleBack} style={{ marginTop: '20px' }}>
          Back to Deliveries
        </Button>
      <Card className='onlyCardSize'>
        <CardHeader title={`Details for the Delivery: ${selectedRow.ID}`} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <strong>Delivery Person ID:</strong> {selectedRow.Delivery_person_ID}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Age:</strong> {selectedRow.Delivery_person_Age}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Restaurant Latitude:</strong> {selectedRow.Restaurant_latitude}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Restaurant Longitude:</strong> {selectedRow.Restaurant_longitude}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Delivery Latitude:</strong> {selectedRow.Delivery_location_latitude}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Delivery Longitude:</strong> {selectedRow.Delivery_location_longitude}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Order Date:</strong> {selectedRow.Order_Date}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Time Ordered:</strong> {selectedRow.Time_Orderd}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Time Picked:</strong> {selectedRow.Time_Order_picked}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Weather Conditions:</strong> {selectedRow.Weather_conditions}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Road Traffic Density:</strong> {selectedRow.Road_traffic_density}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Vehicle Condition:</strong> {selectedRow.Vehicle_condition}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Order Type:</strong> {selectedRow.Type_of_order}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Vehicle Type:</strong> {selectedRow.Type_of_vehicle}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Multiple Deliveries:</strong> {selectedRow.multiple_deliveries}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Festival:</strong> {selectedRow.Festival}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>City:</strong> {selectedRow.City}
            </Grid>
            <Grid item xs={12} sm={6}>
              <strong>Time Taken (min):</strong> {selectedRow.Time_taken_min}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
</div>
  );
};

export default DetailsPage;
