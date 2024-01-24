import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Snackbar, Alert } from '@mui/material';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [unit, setUnit] = React.useState('metric');

    const getWeatherData = async (units) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0b9312f8fa412c7124b67afda0035d80&units=${units}`
            );

            if (!response.ok) {
                if (response.status === 404)
                    throw new Error('City not found!');
                else
                    throw new Error('Something went wrong. Refresh this page and try again.');
            }

            const data = await response.json();
            console.log(data)
            setWeatherData(data);
            setUnit(units)
        } catch (error) {
            setErrorMessage(error.message)
            handleClick()
            setWeatherData(null);
        }
    };



    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Weather App
            </Typography>

            <TextField
                label="Enter city"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ marginBottom: '20px' }}
            />

            <Button variant="outlined" color="primary" onClick={() => getWeatherData('metric')} fullWidth sx={{marginBottom: '8px'}}>
                Get Weather - Celcius
            </Button>
            <Button variant="outlined" color="primary" onClick={() => getWeatherData('imperial')} fullWidth>
                Get Weather - Fahrenheit
            </Button>

            {weatherData && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        {weatherData.name}, {weatherData.sys.country}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        {unit === 'metric' ? `Temperature: ${weatherData.main.temp} Celsius` : `Temperature: ${weatherData.main.temp} Fahrenheit`}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Weather: {weatherData.weather[0].description}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Humidity: {weatherData.main.humidity}%
                    </Typography>
                    <Typography variant="body1" align="center">
                        {unit === 'metric' ? `Wind speed: ${weatherData.wind.speed} meter/sec` : `Wind speed: ${weatherData.wind.speed} miles/hour`}

                    </Typography>
                </div>
            )}
            {open && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="outlined"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>}
        </Paper>
    );
};

export default Weather;
