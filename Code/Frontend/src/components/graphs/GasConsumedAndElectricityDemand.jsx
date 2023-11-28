import {ResponsiveLine} from "@nivo/line";
import React, {useState} from "react";
import '../../App.css';

export default function GasConsumedAndElectricityDemand({data}) {

    // set each line on the graph as separate, so they can be selected
    const [showASHPElecLine, setShowASHPElecLine] = useState(true);
    const [showGSHPElecLine, setShowGSHPElecLine] = useState(true);
    const [showGasConsLine, setShowGasConsLine] = useState(true);
    // const [showTempLine, setShowTempLine] = useState(true);

    // put data into a new list
    const formatData = (data || []).map(({index, "Normalised_ASHP_elec": ASHeatPumpsElec, "Normalised_GSHP_elec": GSHeatPumpsElec, "Normalised_Gas_boiler_gas": boilerGasConsumption, "UK_daily_average_OAT_[degrees_C]": temperature}, dataIndex) => ({
        index: dataIndex,
        time: new Date(index),
        // temperature,
        ASHeatPumpsElec,
        GSHeatPumpsElec,
        boilerGasConsumption,
        temperature
    }));

    // format data from list
    const formattedDataList = [

        {
            // for air source heat pumps
            id: 'Electricity Consumption for Air Source Heat Pumps',
            // color: 'hsl(21,99%,39%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.ASHeatPumpsElec * 579280
            })),
        },
        {
            // for grouns source heat pumps
            id: 'Electricity Consumption for Ground Source Heat Pumps',
            // color: 'hsl(221,78%,75%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.GSHeatPumpsElec * 579280
            })),
        },
        {
            // gas consumption
            id: 'Gas Consumption of Gas Boilers',
            // color: 'hsl(215,95%,37%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.boilerGasConsumption * 579280
            })),
        }
        // {
        //     id: 'Outside Temperature',
        //     // color: 'hsl(0,91%,31%)',
        //     data: formatData.map((item) => ({
        //         x: item.time,
        //         y: item.temperature,
        //     })),
        // }
    ];

    const formattedTemp = [
        {
            id: 'Outside Temperature',
            color: 'hsl(0,91%,31%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.temperature,
            })),
        }
    ];

    // handle if checkboxes are checked or not
    const handleShowASHPElecLine = () => {
        setShowASHPElecLine(!showASHPElecLine);
    }

    const handleShowGSHPElecLine = () => {
        setShowGSHPElecLine(!showGSHPElecLine);
    }

    const handleShowGasConsLine = () => {
        setShowGasConsLine(!showGasConsLine);
    }

    // const handleShowTempLine = () => {
    //     setShowTempLine(!showTempLine);
    // }

    const filteredData = formattedDataList.filter((dataToFilter) => {
        if(dataToFilter.id === "Electricity Consumption for Air Source Heat Pumps") {
            return showASHPElecLine;
        }
        if(dataToFilter.id === "Electricity Consumption for Ground Source Heat Pumps") {
            return showGSHPElecLine;
        }
        if(dataToFilter.id === "Gas Consumption of Gas Boilers") {
            return showGasConsLine;
        }
        // if(dataToFilter.id === "Outside Temperature") {
        //     return showTempLine;
        // }
    })

    console.log("loading graph")

    // output to page
    return(
        <>
            <div className="wrapper">

                <div style={{ width: '95vw', height: "600px", position: "absolute"}}>
                    <ResponsiveLine
                        data={formattedTemp}
                        // layers={["grid", "axes", "lines", "markers", "legends"]}
                        margin={{ top: 120, right: 100, bottom: 20, left: 100 }}
                        yScale={{
                            type: 'linear',
                            min: "auto",
                            max: 'auto',
                            stacked: true,
                            reverse: false }}
                        axisBottom={null}
                        axisLeft={null}
                        axisTop={null}
                        axisRight={{
                            legend: "Temperature",
                            legendPosition:"middle",
                            legendOffset: 50,
                            // null
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        // colors={(d) => d.color}
                        colors={"grey"}
                        // colors={["rgba(255, 255, 255, 0"]}
                        pointSize={0}
                        pointColor={{ from: 'paired' }}
                        pointBorderColor={{ from: 'paired' }}
                        legends={[
                            {
                                anchor: 'top-left',
                                direction: 'column',
                                justify: false,
                                translateX: 0,
                                translateY: -90,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 200,
                                itemHeight: 12,
                                itemOpacity: 1,
                                symbolSize: 8,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)'
                            }]}

                    /> </div>

                <div style={{ width: '95vw', height: "600px", position: "absolute"}}>
                    <ResponsiveLine
                        // data={formattedDataList.flat()}
                        // data={formattedDataList}
                        data={filteredData}
                        // data = {testData}
                        // layers={["grid", "axes", "lines", "markers", "legends"]}
                        margin={{ top: 60, right: 100, bottom: 40, left: 100 }}
                        xScale={
                            { type: 'time',
                                format: '%Y-%m-%dT%H:%M:%S',
                                precision: "minute",
                                tickValues: "every 30 minutes",
                                // min: new Date("2013-01-01T00:00:00"),
                                // max: new Date("2013-03-31T23:30:00"),
                                min: "auto",
                                max: "auto"
                            }
                        }
                        yScale={{
                            type: 'linear',
                            // min: 'auto',
                            // max: 'auto',
                            min: "auto",
                            max: 'auto',
                            stacked: true,
                            reverse: false }}
                        axisBottom={{
                            format: '%b %Y',
                            tickValues: 'every 1 month',
                            legend:"Date",
                            legendPosition:"middle",
                            legendOffset: 35,
                        }}
                        axisLeft={{
                            legend: "Half-hourly Electricity and Gas/Hydrogen Demand for Gas Boilers (GWh)",
                            legendPosition:"middle",
                            legendOffset: -60,
                        }}
                        axisTop={null}
                        axisRight={
                            // legend: "electricity consumption for air-source heat pumps",
                            // legendPosition:"middle",
                            // legendOffset: 35,
                            null
                        }
                        enableGridX={true}
                        enableGridY={true}
                        // colors={(d) => d.color}
                        // colors={["rgba(178, 223, 138)", "rgba(31, 120, 180)", "rgba(166, 206, 227)", "rgba(255, 255, 255, 0"]}
                        colors={{ scheme: 'paired' }}
                        pointSize={0}
                        pointColor={{ from: 'paired' }}
                        pointBorderColor={{ from: 'paired' }}
                        enableSlices={'x'}
                        useMesh={true}
                        sliceTooltip={({ slice }) => (
                            <div style={{background: 'white', padding: '10px', border: '1px solid #ccc'}}>
                                <strong>Date:</strong> {slice.points[0].data.xFormatted}<br></br>
                                {slice.points.map(point => (
                                    <div key={point.id}>
                                        <strong>{point.serieId}:</strong> {point.data.yFormatted}
                                    </div>
                                ))}
                            </div>
                        )}
                        legends={[
                            {
                                anchor: 'top-right',
                                direction: 'column',
                                justify: false,
                                translateX: 0,
                                translateY: -60,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 200,
                                itemHeight: 12,
                                itemOpacity: 1,
                                symbolSize: 8,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)'
                            }]}

                    />
                </div>
            </div>

            <br/>

            {/*  checkboxes  */}
            <div className="graph-checkboxes">
                <label style={{ color: '#ffffff', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showASHPElecLine} onChange={handleShowASHPElecLine} />
                    Electricity Consumption for Air Source Heat Pumps
                </label>
                <label style={{ color: '#ffffff', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showGSHPElecLine} onChange={handleShowGSHPElecLine} />
                    Electricity Consumption for Ground Source Heat Pumps
                </label>
                <label style={{ color: '#ffffff', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px' , marginLeft: '15px'}} type="checkbox" checked={showGasConsLine} onChange={handleShowGasConsLine} />
                    Gas Consumption of Gas Boilers
                </label>
                {/*<label style={{ color: '#ffffff', fontWeight: 'bold'}}>*/}
                {/*    <input style={{ marginRight: '2px' , marginLeft: '15px'}} type="checkbox" checked={showTempLine} onChange={handleShowTempLine} />*/}
                {/*    Show Outside Temperature*/}
                {/*</label>*/}
            </div>
        </>
    )
}
