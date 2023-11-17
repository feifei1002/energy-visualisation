import { ResponsiveLine } from '@nivo/line';
import { ResponsiveAreaBump } from '@nivo/bump'
import { ResponsiveBump } from '@nivo/bump'
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

    //Extract the needed data and put it into a new list
    const formatData = heatData.map(({"Normalised_Resistance_heater_elec": resHeat, "UK_daily_average_OAT_[degrees_C]": temperature, "index": time}, index) => ({
        index,
        time,
        temperature,
        resHeat,
    }));

    const formattedDataList = formatData.map((item => ({
            id: item.temperature,
            data: [
                {
                    x: new Date(item.time), y: item.resHeat
                }
            ]
        }
        // <li key={item.index}>
        //     Time: {item.time},
        //     Temperature: {item.temperature},
        //     Resistance heater heat: {item.resHeat},
        // </li>
    )))






    return(
        <>
            <h1>Graph here - Heat produced</h1>
            <div style={{ width: '100vw', height: 400}}>
                <ResponsiveLine
                    data={formattedDataList}
                    margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                    xScale={
                    { type: 'time',
                        format: '%Y-%m-%dT%H:%M:%S',
                        precision: "month",
                        min: ("2013-01-01T00:00:00"),
                        max: ("2013-12-31T23:30:00"),
                    }
                }
                    yScale={{ type: 'linear', min: 5, max: 100, stacked: true, reverse: false }}
                    axisBottom={{
                        format: '%b %Y',
                        tickValues: 'every 1 month'
                    }}
                    axisTop={null}
                    axisRight={null}
                    enableGridX={false}
                    colors={{ scheme: 'set1' }}
                    pointSize={5}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={3}
                    pointBorderColor={{ from: 'serieColor' }}
                />
            </div>

            <ul>{formattedDataList}</ul>
        </>
    )
}