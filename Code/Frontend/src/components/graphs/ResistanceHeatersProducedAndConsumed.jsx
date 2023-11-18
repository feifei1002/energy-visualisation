import { ResponsiveLine } from '@nivo/line';
import React, {useEffect, useState} from "react";
export default function ResistanceHeatersProducedAndConsumed() {

    const [heatData, setHeatData] = useState([]);
    const [showHeatLine, setShowHeatLine] = useState(true);
    const [showElecLine, setShowElecLine] = useState(true);
    const [showOATLine, setShowOATLine] = useState(true);

    //use to check for style and features of the graph (it is faster)
    const testData = [
        {
            "id": "Data 1",
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
            ]},
        {
            "id": "Data 2",
            "color": "hsl(5, 70%, 50%)",
            "data": [
                {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
                {"x": "2013-02-12T14:00:00", "y": 0.00007365896427030812*100000},
                {"x": "2013-03-08T00:00:00", "y": 0.000044381285702676944*100000},
                {"x": "2013-04-05T01:00:00", "y": 0.00011170909712761813*100000},
                {"x": "2013-05-09T20:00:00", "y": 0.00003897649693032608*100000},
            ]},
    ]

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
    const formatData = heatData.map(({index, "Normalised_Resistance_heater_heat": resHeaterHeat, "Normalised_Resistance_heater_elec": resHeaterElec, "UK_daily_average_OAT_[degrees_C]": temperature}, dataIndex) => ({
        index: dataIndex,
        time: new Date(index),
        temperature,
        resHeaterHeat,
        resHeaterElec,
    }));

    const formattedDataList = [
        {
            id: 'Heat Production',
            color: 'hsl(181, 70%, 50%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.resHeaterHeat* 100000,
            })),
        },
        {
            id: 'Electricity Consumption',
            color: "hsl(5, 70%, 50%)",
            data: formatData.map((item) => ({
                x: item.time,
                y: item.resHeaterElec * 100000,
            })),
        },
        {
            id: 'UK daily OAT',
            color: 'hsl(329, 70%, 50%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.temperature,
            })),
        },
    ];

    const handleshowHeatLineChange = () => {
        setShowHeatLine(!showHeatLine);
    }

    const handleshowElecLineChange = () => {
        setShowElecLine(!showElecLine);
    }

    const handleshowOATLineChange = () => {
        setShowOATLine(!showOATLine);
    }

    const filterData = formattedDataList.filter((data) => {
        if(data.id === "Heat Production") {
            return showHeatLine;
        }
        if(data.id === "Electricity Consumption") {
            return showElecLine;
        }
        if(data.id === "UK daily OAT") {
            return showOATLine;
        }
    })





    return(
        <>
            <div style={{ width: 'inherit', height: 400}}>

                <ResponsiveLine
                    // data={formattedDataList.flat()}
                    data={filterData}
                    // data={testData}
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
                    }}
                    axisLeft={{
                        legend: "Half-hourly heat production by resistance heaters in 2013 (GWh) 10^5",
                        legendPosition:"middle",
                        legendOffset: -35,
                    }}
                    axisTop={null}
                    axisRight={{
                        legend: "Temperature (°C)",
                        legendPosition:"middle",
                        legendOffset: 40,
                    }}
                    enableGridX={false}
                    colors={(d) => d.color}
                    pointSize={3}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={1}
                    pointBorderColor={{ from: 'serieColor' }}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'top-right',
                            direction: 'column',
                            justify: false,
                            translateX: 20,
                            translateY: -40,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 140,
                            itemHeight: 13,
                            itemOpacity: 0.75,
                            symbolSize: 8,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }]}
                />
                <div>
                    <label style={{ color: 'hsl(181, 70%, 50%)', fontWeight: 'bold'}}>
                        <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showHeatLine} onChange={handleshowHeatLineChange} />
                        Heat Production
                    </label>
                    <label style={{ color: 'hsl(5, 70%, 50%)', fontWeight: 'bold'}}>
                        <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showElecLine} onChange={handleshowElecLineChange} />
                        Electricity Consumption
                    </label>
                    <label style={{ color: 'hsl(329, 70%, 50%)', fontWeight: 'bold'}}>
                        <input style={{ marginRight: '2px' , marginLeft: '15px'}} type="checkbox" checked={showOATLine} onChange={handleshowOATLineChange} />
                        UK daily OAT
                    </label>
                </div>
            </div>
        </>
    )
}