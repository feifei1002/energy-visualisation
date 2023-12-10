import { ResponsiveLineCanvas } from '@nivo/line';
import React, {useContext, useState} from "react";
import downloadCSV from "../../helperFunctions/downloadCSV.js";
import {NotificationContext} from "../../contexts/NotificationContext.jsx";
import graphToImage from "../../helperFunctions/graphToImage.js";
export default function ResistanceHeatersProducedAndConsumed({data}) {

    const [showHeatLine, setShowHeatLine] = useState(true);
    const [showElecLine, setShowElecLine] = useState(true);
    const [showOATLine, setShowOATLine] = useState(true);
    const { showNotification } = useContext(NotificationContext);

    // Extract the needed data and put it into a new list
    const formatData = (data || []).map(({index, "Normalised_Resistance_heater_heat": resHeaterHeat, "Normalised_Resistance_heater_elec": resHeaterElec, "UK_daily_average_OAT_[degrees_C]": temperature}, dataIndex) => ({
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
            data: formatData.map((item, index) => {
                if(index % 2 === 0) {
                    return {
                        x:item.time,
                        y: item.resHeaterHeat* 100000,
                    };
                }
                return null;
            }).filter(Boolean),
        },
        {
            id: 'Electricity Consumption',
            color: "hsl(5, 70%, 50%)",
            data: formatData.map((item, index) => {
                if(index % 2 === 0) {
                    return {
                        x: item.time,
                        y: item.resHeaterElec * 100000,
                    };
                }
                return null;
            }).filter(Boolean),
        },
        {
            id: 'UK daily OAT',
            color: 'hsl(329, 70%, 50%)',
            data: formatData.map((item, index) => {
                if (index %2 === 0) {
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
    const handleShowHeatLineChange = () => {
        setShowHeatLine(!showHeatLine);
    }

    const handleShowElecLineChange = () => {
        setShowElecLine(!showElecLine);
    }

    const handleShowOATLineChange = () => {
        setShowOATLine(!showOATLine);
    }

    //To only the data line when the checkbox is checked
    const filterData = formattedDataList.filter((dataToFilter) => {
        if(dataToFilter.id === "Heat Production") {
            return showHeatLine;
        }
        if(dataToFilter.id === "Electricity Consumption") {
            return showElecLine;
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
        showNotification("CSV file is downloaded");
        downloadCSV(extractedDataList, "resistance_heaters_produced_and_consumed.csv");
    }

    const handleDownloadGraphAsImage = () => {
        showNotification("Image is downloaded");
        graphToImage("resistance-heaters-produced-and-consumed", "resistance_heaters_graph.png");
    };


    return(
        <>
            <div style={{ width: 'inherit', height: 400}} id="resistance-heater-produced-and-consumed">
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
                        legend: "Hourly heat production by resistance heaters in 2013 (GWh) 10^5",
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
                    enableSlices={false}
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
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showHeatLine} onChange={handleShowHeatLineChange} />
                    Heat Production
                </label>
                <label style={{fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showElecLine} onChange={handleShowElecLineChange} />
                    Electricity Consumption
                </label>
                <label style={{ fontWeight: 'bold'}}>
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