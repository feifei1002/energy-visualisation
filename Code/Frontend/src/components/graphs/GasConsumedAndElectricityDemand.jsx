import {ResponsiveLine} from "@nivo/line";
import React, {useState} from "react";
import '../../App.css';

// outputs electricity and gas demand data to a graph
export default function GasConsumedAndElectricityDemand({data, demandData}) {

    // set each line on the graph as separate, so they can be selected
    const [showASHPElecLine, setShowASHPElecLine] = useState(true);
    const [showGSHPElecLine, setShowGSHPElecLine] = useState(true);
    const [showGasConsLine, setShowGasConsLine] = useState(true);

    // user inputs value to times by y-axis
    // initial value is 1 so data of the graph is not set to 0
    const [newVal, setNewVal] = useState(1);

    const handleChange = (e) => {
        setNewVal(e.target.value)
        console.log(e.target.value)
    }

    // put data into a new list
    const formatData = (data || []).map(({index, "Normalised_ASHP_elec": ASHeatPumpsElec, "Normalised_GSHP_elec": GSHeatPumpsElec, "Normalised_Gas_boiler_gas": boilerGasConsumption, "UK_daily_average_OAT_[degrees_C]": temperature}, dataIndex) => ({
        index: dataIndex,
        time: new Date(index),
        // electricity produced is split into air source heat pumps, and ground source heat pumps
        // so I have both of them outputted separately
        ASHeatPumpsElec,
        GSHeatPumpsElec,
        boilerGasConsumption,
        temperature
    }));

    // formats data from the list above, so it can be manipulated into a graph
    const formattedDataList = [

        {
            // for air source heat pumps
            id: 'Electricity Consumption for Air Source Heat Pumps',
            data: formatData.map((item) => ({
                x: item.time,
                // example data used to find '579280', which represents 'annual heat supplied by the gas boilers'
                y: item.ASHeatPumpsElec * 579280 * newVal
            })),
        },
        {
            // for ground source heat pumps
            id: 'Electricity Consumption for Ground Source Heat Pumps',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.GSHeatPumpsElec * 579280 * newVal
            })),
        },
        {
            // gas consumption
            id: 'Gas Consumption of Gas Boilers',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.boilerGasConsumption * 579280 * newVal
            })),
        }
    ];

    // formats temperature data, so it can be manipulated into a graph
    const formattedTemp = [
        {
            id: 'Outside Temperature',
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

    // filter data for when checkboxes have an altered state
    const filteredData = formattedDataList.filter((dataToFilter) => {
        // for air source heat pumps
        if(dataToFilter.id === "Electricity Consumption for Air Source Heat Pumps") {
            return showASHPElecLine;
        }
        // for ground source heat pumps
        if(dataToFilter.id === "Electricity Consumption for Ground Source Heat Pumps") {
            return showGSHPElecLine;
        }
        // for gas consumption
        if(dataToFilter.id === "Gas Consumption of Gas Boilers") {
            return showGasConsLine;
        }
    })

    // output to page
    return(
        <>
            {/* wrapper class to overlay both graphs on top of each other, due to nivo not allowing biaxial y-axis */}
            <div className="wrapper"
                 style={{
                     height: "600px",
                     margin: "auto",
                     position: "relative"
            }}>
                {/* absolute used to overlay graphs */}
                <div style={{
                    width: "90%",
                    height: "90%",
                    position: "absolute",
                    margin: "auto",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}>
                    {/* temperature line cannot be overlayed on top of other data because it would mean you cannot hover
                    over values without having to output the same very large amount of data twice, which would slow
                    down the website even more */}
                    {/* as two graphs are outputted directly on top of each other, some axis are set to null on each
                    graph, which means that nivo thinks these are errors and outputs warnings to the console */}
                    {/* line graph outputted, for just the temperature */}
                    <ResponsiveLine
                        data={formattedTemp}
                        margin={{ top: 60, right: 100, bottom: 40, left: 100 }}
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
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        colors={"grey"}
                        pointSize={0}
                        pointColor={{ from: 'paired' }}
                        pointBorderColor={{ from: 'paired' }}
                        legends={[
                            {
                                anchor: 'top-left',
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
                    /> </div>

                <div style={{
                    width: '90%',
                    height: "90%",
                    position: "absolute",
                    margin: "auto",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}>
                    {/* second graph with gas and electricity consumption data */}
                    <ResponsiveLine
                        data={filteredData}
                        margin={{ top: 60, right: 100, bottom: 40, left: 100 }}
                        xScale={
                            { type: 'time',
                                format: '%Y-%m-%dT%H:%M:%S',
                                precision: "minute",
                                tickValues: "every 30 minutes",
                                min: "auto",
                                max: "auto"
                            }
                        }
                        yScale={{
                            type: 'linear',
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
                            null
                        }
                        enableGridX={true}
                        enableGridY={true}
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

            {/* checkboxes to enable and disable each line on the graph */}
            <div className="graph-checkboxes">
                {/* air source heat pumps */}
                <label style={{ color: '#ffffff', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showASHPElecLine} onChange={handleShowASHPElecLine} />
                    Electricity Consumption for Air Source Heat Pumps
                </label>
                {/* ground source heat pumps */}
                <label style={{ color: '#ffffff', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showGSHPElecLine} onChange={handleShowGSHPElecLine} />
                    Electricity Consumption for Ground Source Heat Pumps
                </label>
                {/* gas consumption */}
                <label style={{ color: '#ffffff', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px' , marginLeft: '15px'}} type="checkbox" checked={showGasConsLine} onChange={handleShowGasConsLine} />
                    Gas Consumption of Gas Boilers
                </label>
            </div>

            <div>
                {/* user can type in a value to times by the graph data */}
                <label>Input value to times by y-axis (GWh): </label>
                {/* validation so the user cannot input a value below 1, so the graph will always have data that is displayed */}
                <input data-testid="userInput" type="number" min="1" name="newValue" value={newVal} onChange={handleChange} />
                {/*<button type="button" onClick={handleChange}>Register</button>*/}
            </div>
        </>
    )
}
