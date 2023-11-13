import { ResponsiveAreaBump } from '@nivo/bump';
import React, {useEffect, useState} from "react";
export default function ResistanceHeatersHeatProduced({data}) {

    const [heatData, setHeatData] = useState([]);
    const [average, setAverage] = useState([]);
    const [time, setTime] = useState([]);

    useEffect(() => {
        const fetchHeatData = async () => {
            try {
                const fetchData = await fetch('http://localhost:8082/data/halfhourlyheatingprofile');
                const fetchDataResponse = await fetchData.json();
                setHeatData(fetchDataResponse);
            } catch (error) {
                console.error("Error occurs when fetching data", error);
            }
        };
        fetchHeatData();
        // console.log(heatData[0][ "UK_daily_average_OAT_[degrees_C]"]);
    }, []);

    useEffect(() => {
        const fetchAverageData = async () => {
            try {
                const averages = heatData.map(entry => entry["UK_daily_average_OAT_[degrees_C]"]);
                setAverage((averages));
            } catch (error) {
                console.error("Error occurs when fetching data", error);
            }
        };
        fetchAverageData();
    }, []);

    useEffect(() => {
        const fetchTimeData = async () => {
            try {
                const times = heatData.map(entry => entry["index"]);
                setTime((times));
            } catch (error) {
                console.error("Error occurs when fetching data", error);
            }
        };
        fetchTimeData();
    }, []);

    return(
        <>
            <h1>Graph here - Heat produced</h1>
            {average.length > 0 ? (
                <ul>
                    {average.map((average, index) => (
                        <li key={index}>{average}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}

            {time.length > 0 ? (
                <ul>
                    {time.map((time, index) => (
                        <li key={index}>{time}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}