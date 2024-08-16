import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, Card, Snackbar, Alert  } from '@mui/material';
import TableComponent from './TableComponent';
import AddEntryDialog from './AddEntryDialog';
import '../App.css';

const convertDateFormat = (dateString) => {
  // Convert 'DD-MM-YYYY' to 'YYYY-MM-DD'
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

const convertISOToDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

const HomePage = ({ data, setData, originalData, setOriginalData }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [editingEntry, setEditingEntry] = useState(null);
  const [noDateData, setNoDateData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [stackedwholeData,  setstackedwholeData] = useState(data);

  // Open  Add entry dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Close  add entry dialog
  const handleClose = () => {
    setOpen(false);
    setEditingEntry(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleEditDetails = (entry) => {
    setEditingEntry(entry);
    handleOpen();
  };
  const handleOriginalData = () => {
    setData(originalData);
    setFilteredData(originalData);
    setSelectedDate('');
  }

  // Handle adding a new entry
  const handleAddEntry = (newEntry) => {
    if (selectedDate !== "") {  
      const filtered = data.filter((entry) => (entry.Order_Date) === convertISOToDate(selectedDate));
    if (filtered.length !== 0) {
      const selectedDateEntry = {
        ...newEntry,
        Order_Date: convertISOToDate(newEntry.Order_Date)
      } ;
      const selectedAddedData = [selectedDateEntry, ...filtered, ] ;
      setFilteredData(selectedAddedData);
      const accumulatedData = [selectedDateEntry, ...data, ];
      setData(accumulatedData);
      setstackedwholeData(accumulatedData);
    }
     else if (filtered.length === 0) {
      const noDateEntry = {
        ...newEntry,
        Order_Date: convertISOToDate(newEntry.Order_Date)};
      const noDatezerolength = [noDateEntry, ...noDateData, ]
      setData(noDatezerolength);
      } 
     } else if (selectedDate === "" || selectedDate === null) {
     if (newEntry) {
        const updatedEntry = {
          ...newEntry,
          Order_Date: convertISOToDate(newEntry.Order_Date),
        };
        const updatedData = [updatedEntry, ...data, ];
        setData(updatedData);
        setstackedwholeData(updatedData);
        showSnackbar(`A new record has been added successfully! Total Count: ${updatedData.length}`);
      
      }
      
}  
    handleClose();
    
  };

  // Handle date change
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
      const filtered = stackedwholeData.filter((entry) => entry.Order_Date === convertISOToDate(event.target.value));
      if (filtered.length === 0) {
        showSnackbar('No Data available for this date, Please pick another date.', 'warning');
        setSelectedDate('');
      }
      setFilteredData(filtered);
          showSnackbar(`The Records have been Filtered! Filtered Count for ${convertISOToDate(event.target.value)}: ${filtered.length}`);
  };

  const handleUpdateData = (updatedEntry) => {
    updatedEntry = {
...updatedEntry,
Order_Date: convertISOToDate(updatedEntry.Order_Date)
    };
    if (editingEntry && editingEntry.ID) {
      let updatedData;
      const updatedStackedData = data.map(entry =>
        entry.ID === editingEntry.ID ? { ...entry, ...updatedEntry } : entry)  
        setstackedwholeData(updatedStackedData);
      
     
    updatedData = data.map(entry =>
      entry.ID === editingEntry.ID ? { ...entry, ...updatedEntry } : entry)  
      setData(updatedData);
      showSnackbar('The current record has been edited successfully!!');
    }  
      
  };
  useEffect(() => {
    // Update filteredData when data changes if a date is selected
    if (selectedDate) {
      const filtered = data.filter(
        (entry) => entry.Order_Date === convertISOToDate(selectedDate));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, selectedDate]);

  return (
    <Box className ="homePagecontent">
       <Box  my={2}>
       <Button  onClick={() => handleOriginalData()}  variant="contained" color="primary">Load the Original Data</Button>        
        </Box>     
      <Typography variant="h4" gutterBottom>
        Total Order Deliveries 
      </Typography>
      <Box marginBottom={2}>
        <label htmlFor="order-date">Filter by Order Date: </label>
        <input
          id="order-date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Entry
      </Button>
      <TableComponent data={filteredData} onEdit={handleEditDetails} />

      <Dialog open={open} onClose={handleClose}>
        <AddEntryDialog open={open} onClose={handleClose}onAddEntry={handleAddEntry} onEdit={handleUpdateData} initialData={editingEntry} />
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '300%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
