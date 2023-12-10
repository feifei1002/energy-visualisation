import React, {useContext, useState} from "react";
import {ResponsiveLineCanvas} from "@nivo/line";
import downloadCSV from "../../helperFunctions/downloadCSV.js";
import {NotificationContext} from "../../contexts/NotificationContext.jsx";
import graphToImage from "../../helperFunctions/graphToImage.js";

export default function ElectricityDemandForHeatPumps({data}) {

    const [showASHPElecLine, setShowASHPElecLine] = useState(true);
    const [showGSHPElecLine, setShowGSHPElecLine] = useState(true);
    const [showOATLine, setShowOATLine] = useState(true);
    const { showNotification } = useContext(NotificationContext);

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
            data: formatData.map((item, index) => {
                if(index % 2 === 0) {
                    return {
                        x: item.time,
                        y: item.ashpElec* 100000,
                    };
                }
                return null;
            }).filter(Boolean),
        },
        {
            id: 'ground-source heat pumps',
            color: "hsl(5, 70%, 50%)",
            data: formatData.map((item, index) => {
                if(index % 2 === 0) {
                    return {
                        x: item.time,
                        y: item.gshpElec * 100000,
                    };
                }
                return null;
            }).filter(Boolean),
        },
        {
            id: 'UK daily OAT',
            color: 'hsl(329, 70%, 50%)',
            data: formatData.map((item, index) => {
                if(index % 2 === 0) {
                    return {
                        x: item.time,
                        y: item.temperature,
                    };
                }
                return null;
            }).filter(Boolean),
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

    const extractedDataList = formattedDataList.reduce((data, dataItem) => {
        dataItem.data.forEach((point, index) => {
            if (!data[index]) {
                data[index] = { Time: point.x, [dataItem.id]: point.y };
            } else {
                data[index][dataItem.id] = point.y;
            }
        });
        return data;
    }, []);

    //handle the download CSV file when the download button is clicked
    const handleDownloadCSV = () => {
        showNotification("CSV file downloaded");
        downloadCSV(extractedDataList, "electricity_demand_for_heat_pumps.csv");
    }

    const handleDownloadGraphAsImage = () => {
        showNotification("Image is downloaded");
        graphToImage("electricity-demand-for-heat-pump", "electricity_demand_graph.png");
    };


    return(
        <>
            <div style={{ width: 'inherit', height: 400}} id="electricity-demand-for-heat-pump">

                <ResponsiveLineCanvas
                    data={filterData}
                    // data={testData}
                    margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                    xScale={
                        { type: 'time',
                            format: '%Y-%m-%dT%H:%M:%S', //the time format that is being read
                            precision: "hour", //set the precision to minute instead of hour to check for half-hourly (30min)
                            tickValues: "every 1 hour",
                            //set max and min for conciseness
                            min: new Date("2013-01-01T00:00:00"),
                            max: new Date("2013-12-31T23:00:00"),
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
                    colors={{ scheme: 'paired' }}
                    pointSize={0}
                    pointColor={{ theme: 'background' }}
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
            </div>
            {/*actual checkboxes to check*/}
            <div>
                <label style={{fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showASHPElecLine} onChange={handleShowASHPElecLineChange} />
                    Electricity Consumption for ASHP
                </label>
                <label style={{fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showGSHPElecLine} onChange={handleShowGSHPElecLineChange} />
                    Electricity Consumption for GSHP
                </label>
                <label style={{fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px' , marginLeft: '15px'}} type="checkbox" checked={showOATLine} onChange={handleShowOATLineChange} />
                    UK daily OAT
                </label>
            </div>
            <div>
                <button style={{ background: "#206887", borderColor: "#206887", color: "white", padding: "10px" }} onClick={handleDownloadCSV}>Download CSV</button>&ensp;&ensp;
                <button style={{ background: "#206887", borderColor: "#206887", color: "white", padding: "10px" }} onClick={handleDownloadGraphAsImage}>Download Graph As Image</button>
            </div>
            <br></br>
        </>
    )
}