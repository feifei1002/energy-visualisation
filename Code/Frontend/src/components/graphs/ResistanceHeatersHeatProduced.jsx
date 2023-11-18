import { ResponsiveLine } from '@nivo/line';
import React, {useEffect, useState} from "react";
export default function ResistanceHeatersHeatProduced() {

    const [heatData, setHeatData] = useState([]);

    const testData = [
        {
            "id": "resistance heater heat",
            "color": "hsl(181, 70%, 50%)",
            "data": [
                {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
                {"x": "2013-02-12T14:00:00", "y": 0.00007365896427030812*100000},
                {"x": "2013-03-08T00:00:00", "y": 0.000044381285702676944*100000},
                {"x": "2013-04-05T01:00:00", "y": 0.00011170909712761813*100000},
                {"x": "2013-05-09T20:00:00", "y": 0.00003897649693032608*100000},
            ]},
        {
            "id": "Temperature",
            "color": "hsl(329, 70%, 50%)",
            "data": [
                {"x": "2013-01-01T00:00:00", "y": 7.3},
                {"x": "2013-02-12T14:00:00", "y": 2.2},
                {"x": "2013-03-08T00:00:00", "y": 7.2},
                {"x": "2013-04-05T01:00:00", "y": 4},
                {"x": "2013-05-09T20:00:00", "y": 13},
            ]
        }]

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
    const formatData = heatData.map(({index, "Normalised_Resistance_heater_elec": resHeat, "UK_daily_average_OAT_[degrees_C]": temperature}, dataIndex) => ({
        index: dataIndex,
        time: new Date(index),
        temperature,
        resHeat,
    }));

    const formattedDataList = [
        {
            id: 'Resistance heater heat',
            color: 'hsl(181, 70%, 50%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.resHeat * 100000,
            })),
        },
        {
            id: 'Temperature',
            color: 'hsl(329, 70%, 50%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.temperature,
            })),
        },
    ];





    return(
        <>
            <div style={{ width: '100vw', height: 400}}>
                <ResponsiveLine
                    data={formattedDataList.flat()}
                    margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                    xScale={
                    { type: 'time',
                        format: '%Y-%m-%dT%H:%M:%S',
                        precision: "minute",
                        tickValues: "every 30 minutes",
                        min: new Date("2013-01-01T00:00:00"),
                        max: new Date("2013-12-31T23:30:00"),
                    }
                }
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    axisBottom={{
                        format: '%b %Y',
                        tickValues: 'every 1 month',
                        legend:"Date",
                        legendPosition:"middle",
                        legendOffset: 35,
                    }}
                    axisLeft={{
                        legend: "Temperature",
                        legendPosition:"middle",
                        legendOffset: -35,
                    }}
                    axisTop={null}
                    axisRight={{
                        legend: "Resistance heater heat",
                        legendPosition:"middle",
                        legendOffset: 35,
                    }}
                    enableGridX={false}
                    colors={(d) => d.color}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={3}
                    pointBorderColor={{ from: 'serieColor' }}
                />
            </div>
        </>
    )
}