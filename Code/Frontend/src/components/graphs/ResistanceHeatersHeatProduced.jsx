import { ResponsiveAreaBump } from '@nivo/bump';
import React, {useEffect, useState} from "react";
export default function ResistanceHeatersHeatProduced() {

    const [heatData, setHeatData] = useState([]);

    //fetch all the data from the CSV
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

    const formatData = heatData.map(({"Normalised_Resistance_heater_elec": resHeat, "UK_daily_average_OAT_[degrees_C]": temperature, "index": time}, index) => ({
        index,
        time,
        temperature,
        resHeat,
    }));

    const formattedDataList = formatData.map((item => (
        <li key={item.index}>
            Time: {item.time},
            Temperature: {item.temperature},
            Resistance heater heat: {item.resHeat},
        </li>
    )))





    return(
        <>
            <h1>Graph here - Heat produced</h1>

            <ul>{formattedDataList}</ul>
        </>
    )
}