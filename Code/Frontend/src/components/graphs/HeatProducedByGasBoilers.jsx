import { ResponsiveAreaBump } from "@nivo/bump";
import React, { useEffect, useState } from "react";
import {ResponsiveLine} from "@nivo/line";

export default function HeatProducedByGasBoilers({data}) {

    // const [heatData, setHeatData] = useState([]);

    // // set heat data, with error handling
    // useEffect(() => {
    //     const fetchHeatData = async () => {
    //         try {
    //             // fetch data
    //             const fetchData = await fetch('http://localhost:8082/data/halfhourlyheatingprofile');
    //             const fetchDataResponse = await fetchData.json();
    //             setHeatData(fetchDataResponse);
    //         } catch (error) {
    //             console.error("Error occurs when fetching data", error);
    //         }
    //     };
    //     fetchHeatData();
    // }, []);

    // put data into a new list
    const formatData = (data || []).map(({index, "Normalised_Gas_boiler_heat": gasHeat, "UK_daily_average_OAT_[degrees_C]": temperature}, dataIndex) => ({
        index: dataIndex,
        time: new Date(index),
        temperature,
        gasHeat,
    }));

    const formattedDataList = [
        {
            id: 'Gas boiler heat',
            color: 'hsl(181, 70%, 50%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.gasHeat * 100000,
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
        {
            id: 'UK daily OAT',
            color: 'hsl(500, 70%, 50%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.temperature,
            })),
        },

    ];

    const filteredData = formattedDataList.filter(dataToFilter.id = "Gas boiler heat");



    return(
        <>
            <h1>Graph here - Heat produced</h1>

            <div style={{ width: '100vw', height: 400}}>
                <ResponsiveLine
                    // data={formattedDataList.flat()}
                    data={filteredData}
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
                        legend: "Temperature (deg. Celsius)",
                        legendPosition:"middle",
                        legendOffset: -35,
                    }}
                    axisTop={null}
                    axisRight={{
                        legend: "Half-hourly heat produced by gas boilers",
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
