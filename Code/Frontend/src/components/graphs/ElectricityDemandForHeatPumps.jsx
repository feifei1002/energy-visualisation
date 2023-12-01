import React, {useState} from "react";
import {ResponsiveLine} from "@nivo/line";
import downloadCSV from "../../helperFunctions/downloadCSV.js";

export default function ElectricityDemandForHeatPumps({data}) {

    const [showASHPElecLine, setShowASHPElecLine] = useState(true);
    const [showGSHPElecLine, setShowGSHPElecLine] = useState(true);
    const [showOATLine, setShowOATLine] = useState(true);

    //a set of test data to use to generate the graph instead of the actual data (very slow)
    const testData = [
        {
            "id": "air-source heat pumps",
            "color": "hsl(181, 70%, 50%)",
            "data": [
                {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
                {"x": "2013-02-12T14:00:00", "y": 0.00007365896427030812*100000},
                {"x": "2013-03-08T00:00:00", "y": 0.000044381285702676944*100000},
                {"x": "2013-04-05T01:00:00", "y": 0.00011170909712761813*100000},
                {"x": "2013-05-09T20:00:00", "y": 0.00003897649693032608*100000},
            ]},
        {
            "id": "ground-source heat pumps",
            "color": "hsl(329, 70%, 50%)",
            "data": [
                {"x": "2013-01-01T00:00:00", "y": 7.3},
                {"x": "2013-02-12T14:00:00", "y": 2.2},
                {"x": "2013-03-08T00:00:00", "y": 7.2},
                {"x": "2013-04-05T01:00:00", "y": 4},
                {"x": "2013-05-09T20:00:00", "y": 13},
            ]},
        {
            "id": "UK daily OAT",
            "color": "hsl(5, 70%, 50%)",
            "data": [
                {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
                {"x": "2013-02-12T14:00:00", "y": 0.00007365896427030812*100000},
                {"x": "2013-03-08T00:00:00", "y": 0.000044381285702676944*100000},
                {"x": "2013-04-05T01:00:00", "y": 0.00011170909712761813*100000},
                {"x": "2013-05-09T20:00:00", "y": 0.00003897649693032608*100000},
            ]},
    ]

    //Extract the needed data and put it into a new list
    const formatData = (data || []).map(({index, "Normalised_ASHP_elec": ashpElec, "Normalised_GSHP_elec": gshpElec, "UK_daily_average_OAT_[degrees_C]": temperature}, dataIndex) => ({
        index: dataIndex,
        time: new Date(index),
        temperature,
        ashpElec,
        gshpElec,
    }));

    const formattedDataList = [
        {
            id: 'air-source heat pumps',
            color: 'hsl(181, 70%, 50%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.ashpElec* 100000,
            })),
        },
        {
            id: 'ground-source heat pumps',
            color: "hsl(5, 70%, 50%)",
            data: formatData.map((item) => ({
                x: item.time,
                y: item.gshpElec * 100000,
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
    //To handle if the checkboxes are being checked or not
    const handleShowASHPElecLineChange = () => {
        setShowASHPElecLine(!showASHPElecLine);
    }

    const handleShowGSHPElecLineChange = () => {
        setShowGSHPElecLine(!showGSHPElecLine);
    }

    const handleShowOATLineChange = () => {
        setShowOATLine(!showOATLine);
    }

    //To only the data line when the checkbox is checked
    const filterData = formattedDataList.filter((dataToFilter) => {
        if(dataToFilter.id === "air-source heat pumps") {
            return showASHPElecLine;
        }
        if(dataToFilter.id === "ground-source heat pumps") {
            return showGSHPElecLine;
        }
        if(dataToFilter.id === "UK daily OAT") {
            return showOATLine;
        }
    })

    const handleDownloadCSV = () => {
        downloadCSV(formatData, "electricity_demand_for_heat_pumps.csv");
    }


    return(
        <>
            <div style={{ width: 'inherit', height: 400}}>

                <ResponsiveLine
                    data={filterData}
                    // data={testData}
                    margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                    xScale={
                        { type: 'time',
                            format: '%Y-%m-%dT%H:%M:%S', //the time format that is being read
                            precision: "minute", //set the precision to minute instead of hour to check for half-hourly (30min)
                            tickValues: "every 30 minutes",
                            //set max and min for conciseness
                            min: new Date("2013-01-01T00:00:00"),
                            max: new Date("2013-12-31T23:30:00"),
                        }
                    }
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    axisBottom={{
                        format: '%b %Y', //the time format that is being shown in the actual graph
                        tickValues: 'every 1 month', //x-axis shows the months only to make the graph looks cleaner
                    }}
                    axisLeft={{
                        legend: "Electricity Consumption for heat pumps in 2013 (GWh) 10^5",
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
                    // colors={(d) => d.color}
                    colors={{ scheme: 'set2' }}
                    pointSize={3}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={1}
                    pointBorderColor={{ from: 'serieColor' }}
                    enableSlices={'x'}
                    useMesh={true}
                    sliceTooltip={({ slice }) => (
                        <div style={{background: 'white', padding: '10px', border: '1px solid #ccc'}}>
                            {/*Style the box for showing the slice data*/}
                            {/*Get the date value from the slice and display it*/}
                            <strong>Date:</strong> {slice.points[0].data.xFormatted}<br></br>

                            {/*For each slice where data value points to,
                            display all the value from three lines in y-axis base on the line's id (name of the line)*/}
                            {slice.points.map(point => (
                                <div key={point.id}>
                                    <strong>{point.serieId}:</strong> {point.data.yFormatted}
                                </div>
                            ))}
                            {/*A customisation for enableSlices and useMesh*/}
                            {/*Take a slice as an argument which contains all the data for the current slice*/}
                        </div>
                    )}
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

                {/*actual checkboxes to check*/}
                <div>
                    <label style={{ color: '#66c2a5', fontWeight: 'bold'}}>
                        <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showASHPElecLine} onChange={handleShowASHPElecLineChange} />
                        Electricity Consumption for ASHP
                    </label>
                    <label style={{ color: '#fc8d62', fontWeight: 'bold'}}>
                        <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showGSHPElecLine} onChange={handleShowGSHPElecLineChange} />
                        Electricity Consumption for GSHP
                    </label>
                    <label style={{ color: '#8da0cb', fontWeight: 'bold'}}>
                        <input style={{ marginRight: '2px' , marginLeft: '15px'}} type="checkbox" checked={showOATLine} onChange={handleShowOATLineChange} />
                        UK daily OAT
                    </label>
                </div>
                <div>
                    <button style={{ background: "#206887", borderColor: "#206887", color: "white", padding: "10px" }} onClick={handleDownloadCSV}>Download CSV</button>
                </div>
            </div><br></br>
        </>
    )
}