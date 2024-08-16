import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button, Container, Box, CircularProgress, Typography } from '@mui/material';
import HomePage from './Components/HomePage';
import DetailsPage from './Components/DetailsPage';

// Fetch dataset from GitHub
const fetchData = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/romyboy94/Great-National-Hotel-Indonesian-recipes/main/Zomato%20Dataset.csv');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return '';
  }
};

// Parse CSV data
const parseCSV = (csvText) => {
  try {
    const rows = csvText.split('\n').map(row => row.split(','));
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      row.forEach((value, index) => {
        obj[headers[index]] = value;
      });
      return obj;
    });
    return data;
  } catch (error) {
    console.error('Failed to parse CSV:', error);
    return [];
  }
};

const App = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [originalData, setOriginalData]  = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      const csvText = await fetchData();
      const parsedData = parseCSV(csvText);
      setData(parsedData); 
      setOriginalData(parsedData);
      setLoading(false);
    };
    loadData();
  }, []);
  return (
    <Router>
      <Container>
      <Typography justifyContent="center" className='header' variant="h3" gutterBottom>
        Great National Hotel and resorts
      </Typography>
         {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <CircularProgress />
            <Typography variant="h6" style={{ marginLeft: '10px' }}>
             Please Wait, Data is being fetched...
            </Typography>
          </Box>
        ) : (
          <Routes>
            <Route path="/"
            element={
              <HomePage
                data={data}
                setData={setData}
                originalData={originalData}
                setOriginalData={setOriginalData}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} />} />
            <Route path="/details/:id" element={<DetailsPage data={data} />} />
          </Routes>
        )}
      </Container>
    </Router>
  );
};

export default App;
