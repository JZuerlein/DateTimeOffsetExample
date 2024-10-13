import { useEffect, useState } from 'react';
import './App.css';
import { TimeZoneProvider } from './TimeZoneProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DateTimeOffsetControl from './DateTimeOffsetControl';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeZoneProvider>
                <div>
                    <h1 id="tableLabel">Weather forecast</h1>
                    <p>This component demonstrates fetching data from the server.</p>
                    <DateTimeOffsetControl selectedDateTime={selectedDateTime} onChange={setSelectedDateTime} />
                    {contents}
                </div>
            </TimeZoneProvider>
        </LocalizationProvider>
    );

    async function populateWeatherData() {
        const encodedDateTimeOffset = encodeURIComponent(dayjs(selectedDateTime).tz().format('YYYY-MM-DDTHH:mm:ssZ'));
        const response = await fetch('weatherforecast/byDateTimeOffset/' + encodedDateTimeOffset);
        console.log(response);
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;