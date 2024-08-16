import React from 'react';
import { Button, TextField, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

const AddEntryDialog = ({ open, onClose, onEdit, onAddEntry, initialData }) => {
  if (open === undefined) {
    console.error("The 'open' prop is required for AddEntryDialog");
  }
  return (
    <Dialog open={open} onClose={onClose}>
    <Formik
      initialValues={initialData || {
        Delivery_person_ID: '',
        Delivery_person_Age: '',
        Restaurant_latitude: '',
        Restaurant_longitude: '',
        Delivery_location_latitude: '',
        Delivery_location_longitude: '',
        Order_Date: '',
        Time_Orderd: '',
        Time_Order_picked: '',
        Weather_conditions: '',
        Road_traffic_density: '',
        Vehicle_condition: '',
        Type_of_order: '',
        Type_of_vehicle: '',
        multiple_deliveries: '',
        Festival: '',
        City: '',
        Time_taken_min: ''
      }}
      validationSchema={Yup.object({
        Delivery_person_ID: Yup.string().required('Delivery Person ID is required'),
          Delivery_person_Age: Yup.number().required('Delivery Person Age is required'),
          Order_Date: Yup.date().required('Order Date is required'),
          Time_Orderd: Yup.string().required('Time Ordered is required'),
          Time_Order_picked: Yup.string().required('Time Order Picked is required'),
          Time_taken_min: Yup.number().required('Time Taken (min) is required')
      })}
      onSubmit={(values, { resetForm }) => {
        if (initialData) {
          // If initialData is present, existing entry is being updated
          if (typeof onEdit === 'function') {
            onEdit({ ...values, ID: initialData.ID });
          }
        }
        else  {
          const newEntry = {...values,ID: uuidv4()}
          onAddEntry(newEntry);
        }
        resetForm();
        onClose();
      }}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <DialogTitle>{initialData ? 'Edit Existing Entry' : 'Add New Entry'}</DialogTitle>
          <DialogContent>
            <TextField
              name="Delivery_person_ID"
              label="Delivery Person ID"
              value={values.Delivery_person_ID}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={touched.Delivery_person_ID && Boolean(errors.Delivery_person_ID)}
                helperText={<ErrorMessage name="Delivery_person_ID" />}
            />
            <TextField
              name="Delivery_person_Age"
              label="Delivery Person Age"
              type="number"
              value={values.Delivery_person_Age}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={touched.Delivery_person_Age && Boolean(errors.Delivery_person_Age)}
                helperText={<ErrorMessage name="Delivery_person_Age" />}
            />
            <TextField
              name="Restaurant_latitude"
              label="Restaurant Latitude"
              type="number"
              value={values.Restaurant_latitude}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="Restaurant_longitude"
              label="Restaurant Longitude"
              type="number"
              value={values.Restaurant_longitude}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="Delivery_location_latitude"
              label="Delivery Location Latitude"
              type="number"
              value={values.Delivery_location_latitude}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="Delivery_location_longitude"
              label="Delivery Location Longitude"
              type="number"
              value={values.Delivery_location_longitude}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="Order_Date"
              label="Order Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={values.Order_Date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={touched.Order_Date && Boolean(errors.Order_Date)}
                helperText={<ErrorMessage name="Order_Date" />}
            />
            <TextField
              name="Time_Orderd"
              label="Time Ordered"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={values.Time_Orderd}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={touched.Time_Orderd && Boolean(errors.Time_Orderd)}
                helperText={<ErrorMessage name="Time_Orderd" />}
            />
            <TextField
              name="Time_Order_picked"
              label="Time Order Picked"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={values.Time_Order_picked}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={touched.Time_Order_picked && Boolean(errors.Time_Order_picked)}
                helperText={<ErrorMessage name="Time_Order_picked" />}
            />
            <TextField
              name="Weather_conditions"
              label="Weather Conditions"
              value={values.Weather_conditions}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="Road_traffic_density"
              label="Road Traffic Density"
              value={values.Road_traffic_density}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="Vehicle_condition"
              label="Vehicle Condition"
              value={values.Vehicle_condition}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="Type_of_order"
              label="Type of Order"
              value={values.Type_of_order}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="Type_of_vehicle"
              label="Type of Vehicle"
              value={values.Type_of_vehicle}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="multiple_deliveries"
              label="Multiple Deliveries"
              value={values.multiple_deliveries}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="Festival"
              label="Festival"
              value={values.Festival}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="City"
              label="City"
              value={values.City}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="Time_taken_min"
              label="Time Taken (min)"
              type="number"
              value={values.Time_taken_min}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={touched.Time_taken_min && Boolean(errors.Time_taken_min)}
                helperText={<ErrorMessage name="Time_taken_min" />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="success">
              {initialData ? 'Save Changes' : 'Add Entry'}
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
    </Dialog>
  );
};

export default AddEntryDialog;
