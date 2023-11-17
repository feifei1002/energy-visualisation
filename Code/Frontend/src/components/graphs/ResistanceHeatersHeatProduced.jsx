import { ResponsiveLine } from '@nivo/line';
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
    const formatData = heatData.map(({index, "Normalised_Resistance_heater_elec": resHeat, "UK_daily_average_OAT_[degrees_C]": temperature}, dataIndex) => ({
        index: dataIndex,
        time: new Date(index),
        temperature,
        resHeat,
    }));


    const formattedDataList = formatData.map((item) => [
        {
            id: 'Resistance heater heat',
            color: 'red',
            data: [
                {
                    x: new Date(item.time),
                    y: item.resHeat*1000000,
                },
            ],
        },
        {
            id: 'Temperature',
            color: 'blue',
            data: [
                {
                    x: new Date(item.time),
                    y: item.temperature,
                },
            ],
        },
    ]);

    // const displaylist = formatData.map((item => (
    //     <li key={item.index}>
    //         Time: {item.time},
    //         Temperature: {item.temperature},
    //         Resistance heater heat: {item.resHeat},
    //     </li>
    // )))





    return(
        <>
            <div style={{ width: '100vw', height: 400}}>
                <ResponsiveLine
                    data={formattedDataList.flat()}
                    margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                    xScale={
                    { type: 'time',
                        format: '%Y-%m-%dT%H:%M:%S',
                        precision: "month",
                        min: new Date("2013-01-01T00:00:00"),
                        max: new Date("2013-12-31T23:30:00"),
                    }
                }
                    yScale={{ type: 'linear', min: 'auto', max: 100, stacked: true, reverse: false }}
                    axisBottom={{
                        format: '%b %Y',
                        tickValues: 'every 1 month',
                    }}
                    axisTop={null}
                    axisRight={null}
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