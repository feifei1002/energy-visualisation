import {ResponsiveLineCanvas} from "@nivo/line";
import React, {useEffect, useRef, useState} from "react";
import '../../App.css';
import downloadCSV from "../../helperFunctions/downloadCSV.js";
import graphToPdf from "../../helperFunctions/graphToPdf.js";
import {toast} from "react-toastify";
import graphToImage from "../../helperFunctions/graphToImage.js";

// outputs electricity and gas demand data to a graph
export default function GasConsumedAndElectricityDemand({data}) {

    // set each line on the graph as separate, so they can be selected
    const [showASHPElecLine, setShowASHPElecLine] = useState(true);
    const [showGSHPElecLine, setShowGSHPElecLine] = useState(true);
    const [showGasConsLine, setShowGasConsLine] = useState(true);

    // manage loading state of the graph data
    const [loading, setLoading] = useState(false);
    // the data for the temperature line graph
    const [graph1Data, setGraph1Data] = useState([]);
    // the data for the hourly demand graph
    const [graph2Data, setGraph2Data] = useState([]);
    // both graph data from the csv, used to generate csv
    const [combinedGraphData, setCombinedGraphData] = useState([]);

    // user inputs value to times by y-axis
    // initial value is 1 so data of the graph is not set to 0
    const [newVal, setNewVal] = useState(1);

    const showToastRef = useRef(false);

    // when the user inputs a new value, uses setNewVal to change the variable
    const handleChange = (e) => {
        setNewVal(e.target.value)
        console.log("changed the value to " + e.target.value)
    }

    //On load send a notification reminding the user to scroll down to use the contact us form
    useEffect(() => {
        // Condition to prevent toast from being shown more than once.
        if (showToastRef.current) return;
        showToastRef.current = true;

        toast.info("Scroll Down to Download the Graph Data ↓",
            {autoClose: 10000,
                position: "top-right"
            }
        );
    }, []);

    // runs first time, and when data or newVal changes
    useEffect(() => {
        // makes sure there is data
        if (!data) return;

        // shows the data is being loaded
        setLoading(true);

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
                data: formatData.map((item, index) => {
                    // Select every second data point to reduce lag
                    if (index % 2 === 0) {
                        return {
                            x: item.time,
                            // example data used to find '579280', which represents 'annual heat supplied by the gas boilers'
                            y: item.ASHeatPumpsElec * 579280 * newVal
                        };
                    }
                    return null; // Skip alternate data points
                }).filter(Boolean),
            },
            {
                // for ground source heat pumps
                id: 'Electricity Consumption for Ground Source Heat Pumps',
                data: formatData.map((item, index) => {
                    // Select every second data point to reduce lag
                    if (index % 2 === 0) {
                        return {
                            x: item.time,
                            // example data used to find '579280', which represents 'annual heat supplied by the gas boilers'
                            y: item.ASHeatPumpsElec * 579280 * newVal
                        };
                    }
                    return null; // Skip alternate data points
                }).filter(Boolean),
            },
            {
                // gas consumption
                id: 'Gas Consumption of Gas Boilers',
                data: formatData.map((item, index) => {
                    // Select every second data point to reduce lag
                    if (index % 2 === 0) {
                        return {
                            x: item.time,
                            // example data used to find '579280', which represents 'annual heat supplied by the gas boilers'
                            y: item.ASHeatPumpsElec * 579280 * newVal
                        };
                    }
                    return null; // Skip alternate data points
                }).filter(Boolean),
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

        // sets the graph data
        setGraph2Data(formattedDataList);
        setGraph1Data(formattedTemp);
        // set the combined data so it can be downloaded
        setCombinedGraphData(formatData);
        // sets the state to no longer loading graph data
        setLoading(false);
    }, [data, newVal]);     // added newVal so this hook is run whenever newVal changes (so the graph updates)



    // handle if checkboxes are checked or not
    // air source heat pumps
    const handleShowASHPElecLine = () => {
        setShowASHPElecLine(!showASHPElecLine);
    }
    // ground source heat pumps
    const handleShowGSHPElecLine = () => {
        setShowGSHPElecLine(!showGSHPElecLine);
    }
    // gas consumption
    const handleShowGasConsLine = () => {
        setShowGasConsLine(!showGasConsLine);
    }

    // filter data for when checkboxes have an altered state
    const filteredData = graph2Data.filter((dataToFilter) => {
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

    // utilising already created download csv function
    // creates downloadable csv file for all the data used on the graph
    const handleDownloadCSV = () => {
        try {
            downloadCSV(combinedGraphData, "gas_consumed_and_electricity_demand.csv");
            toast.success('Downloaded CSV File');
        } catch (e) {
            toast.error('Error Downloading CSV File');
        }
    }

    // utilising already created download as pdf function
    // creates a downloadable pdf file of the graph outputted
    // not used in the page anymore as creates a blurry image of the graph
    const handleGeneratePDF = () => {
        try{
            // define container id to be converted to pdf
            graphToPdf('combinedGraphsForGasBoilers',
                // define title of file
                `Breakdown of Hourly Temperature, Electricity Consumption for Heat Pumps, and Gas Consumption for Gas Boilers`).then(r => console.log("successful graph to pdf"));
            // toast outputs notification for successful download
            toast.success('Graph converted to pdf and downloaded');
        } catch(e){
            // error handling for when a pdf cannot be created
            toast.error('Error converting graph to pdf');
        }
    };

    // creates an image of the line graph that the user downloads
    const handleDownloadGraphAsImage = () => {
        try {
            // define container id to be converted to png
            graphToImage("combinedGraphsForGasBoilers", "gas_boilers_graph.png")
            // toast outputs notification for successful download
            toast.success('Graph Converted to PNG and Downloaded');
        } catch (e) {
            // unable to download
            toast.error('Error Converting Graph to PNG');
        }
    };

    // output to page
    return(
        <div>
            {/* Added 'loading data' section to be displayed while the graph data is being filtered,
              although most of the time spent loading is when 'ResponsiveLineCanvas' is called twice below.
              So the 'loading data' section cannot be displayed while the graph is already being called */}
            {loading ? ( // displays 'Loading data...' message
                <h2>Loading data...</h2>
            ) : (
                    // actual data below once loaded
            <div>
                 {/*specific id used to identify section of code to be outputted as pdf */}
                 <div id='combinedGraphsForGasBoilers' style={{
                     // added white background so when downloading an image of the graph the data is visible in dark mode
                     backgroundColor: 'white'
                 }}>

                     {/*wrapper class to overlay both graphs on top of each other, due to nivo not allowing biaxial y-axis*/}
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
                            <ResponsiveLineCanvas
                                data={graph1Data}
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
                                    legendOffset: 40,
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
                            <ResponsiveLineCanvas
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
                                    legend: "Hourly Electricity and Gas/Hydrogen Demand for Gas Boilers (GWh)",     // data changed to hourly to reduce slow loading times
                                    legendPosition:"middle",
                                    legendOffset: -60,
                                }}
                                axisTop={null}
                                axisRight={
                                    null
                                }
                                enableGridX={true}
                                enableGridY={true}
                                colors={{ scheme: 'paired' }}   // simple colour scheme is used to make the graph easy to read
                                pointSize={0}
                                pointColor={{ from: 'paired' }}
                                pointBorderColor={{ from: 'paired' }}
                                enableSlices={'x'}
                                useMesh={true}
                                // slice to show the specific data points when you hover over the graph
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
                                // legend shows what each colour on the graph represents
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
                 </div>

                <br/>

                <div>

                    <h5>Un-Tick Boxes to Remove a Specific Line From the Graph Above:</h5>
                    {/* checkboxes to enable and disable each line on the graph */}
                    <div className="graph-checkboxes">

                        {/* gas consumption */}
                        <label style={{ color: '#ffffff'}}>
                            <input
                                style={{ marginRight: '2px' , marginLeft: '15px'}}
                                type="checkbox" checked={showGasConsLine} onChange={handleShowGasConsLine} />
                            Gas Consumption of Gas Boilers
                        </label>

                        {/* ground source heat pumps */}
                        <label style={{ color: '#ffffff'}}>
                            <input
                                style={{ marginRight: '2px', marginLeft: '15px' }}
                                type="checkbox" checked={showGSHPElecLine} onChange={handleShowGSHPElecLine} />
                            Electricity Consumption for Ground Source Heat Pumps
                        </label>

                        {/* air source heat pumps */}
                        <label style={{ color: '#ffffff'}}>
                            <input
                                style={{ marginRight: '2px', marginLeft: '15px' }}
                                type="checkbox" checked={showASHPElecLine} onChange={handleShowASHPElecLine} />
                            Electricity Consumption for Air Source Heat Pumps
                        </label>
                    </div>

                    <br/>

                    <h5>Alter the Y-Axis:</h5>
                    <div>

                        {/* user can type in a value to times by the graph data */}
                        <label>Input value to times by y-axis (GWh): </label>
                            {/* validation so the user cannot input a value below 1, so the graph will always have data that is displayed */}
                        <input data-testid="userInput"
                               type="number"
                               min="1"
                               name="newValue"
                               value={newVal}
                               onChange={handleChange} />
                    </div>


                    <br/><br/>


                    <h5>Buttons to Download Graph Data:</h5>
                    <div className="buttons" style={{
                        display: 'flex',
                        // display: 'inline-block'
                        justifyContent: 'center',
                        gap: '20px'
                    }}>
                        {/* button to download the csv file */}
                        <div>
                            <button style={{
                                backgroundColor: 'rgba(20, 72, 94, 0.99)',
                                color: "white",
                                padding: "10px" }}
                                    onClick={handleDownloadCSV}>
                                Download Graph Data as CSV File
                            </button>
                        </div>

                        <div>
                            {/* button to generate image */}
                            <button onClick={handleDownloadGraphAsImage}
                                    style={{
                                        padding: "10px",
                                        backgroundColor: 'rgba(20, 72, 94, 0.99)',
                                        color: 'white'}}>
                                Download Graph as Image
                            </button>
                        </div>
                    </div>
                    <br/>

                </div>
            </div>
            )}
        </div>
    )
}