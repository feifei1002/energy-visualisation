import {ResponsiveLine} from "@nivo/line";
import React, {useState} from "react";
import '../../App.css';

export default function GasConsumedAndElectricityDemand({data}) {

    // set each line on the graph as separate, so they can be selected
    const [showASHPElecLine, setShowASHPElecLine] = useState(true);
    const [showGSHPElecLine, setShowGSHPElecLine] = useState(true);
    const [showGasConsLine, setShowGasConsLine] = useState(true);
    const [showTempLine, setShowTempLine] = useState(true);

    // put data into a new list
    const formatData = (data || []).map(({index, "Normalised_ASHP_elec": ASHeatPumpsElec, "Normalised_GSHP_elec": GSHeatPumpsElec, "Normalised_Gas_boiler_gas": boilerGasConsumption, "UK_daily_average_OAT_[degrees_C]": temperature}, dataIndex) => ({
        index: dataIndex,
        time: new Date(index),
        // temperature,
        // ASHeatPumpsElec,
        // GSHeatPumpsElec,
        boilerGasConsumption,
        // temperature
    }));

    // format data from list
    const formattedDataList = [
        // {
        //     // for air source heat pumps
        //     id: 'electricity consumption for air-source heat pumps',
        //     color: 'hsl(219,95%,33%)',
        //     data: formatData.map((item) => ({
        //         x: item.time,
        //         y: item.ASHeatPumpsElec * 100000
        //     })),
        // },
        // {
        //     // for grouns source heat pumps
        //     id: 'electricity consumption for ground source heat pumps',
        //     color: 'hsl(0,90%,34%)',
        //     data: formatData.map((item) => ({
        //         x: item.time,
        //         y: item.GSHeatPumpsElec * 100000
        //     })),
        // },
        {
            // gas consumption
            id: 'gas consumption of gas boilers',
            color: 'hsl(276,91%,38%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.boilerGasConsumption * 100000
            })),
        },
        // {
        //     id: 'outside temperature',
        //     color: 'hsl(138,87%,18%)',
        //     data: formatData.map((item) => ({
        //         x: item.time,
        //         y: item.temperature,
        //     })),
        // }
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

    const handleShowTempLine = () => {
        setShowTempLine(!showTempLine);
    }

    const filteredData = formattedDataList.filter((dataToFilter) => {
        if(dataToFilter.id === "electricity consumption for air-source heat pumps") {
            return showASHPElecLine;
        }
        if(dataToFilter.id === "electricity consumption for ground source heat pumps") {
            return showGSHPElecLine;
        }
        if(dataToFilter.id === "gas consumption of gas boilers") {
            return showGasConsLine;
        }
        if(dataToFilter.id === "outside temperature") {
            return showTempLine;
        }
    })

    // output to page
    return(
        <>

            <div style={{ width: '100vw', height: 700}}>
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
                            max: new Date("2013-03-31T23:30:00"),
                        }
                    }
                    yScale={{
                        type: 'linear',
                        // min: 'auto',
                        // max: 'auto',
                        min: 0,
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
                    axisRight={{
                        // legend: "electricity consumption for air-source heat pumps",
                        // legendPosition:"middle",
                        // legendOffset: 35,
                        legend: "Temperature (°C)",
                        legendPosition:"middle",
                        legendOffset: 40,
                    }}
                    enableGridX={false}
                    colors={(d) => d.color}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={3}
                    pointBorderColor={{ from: 'serieColor' }}
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
            </div><br/><br/>

            {/*  checkboxes  */}
            <div className="graph-checkboxes">
                <label style={{ backgroundColor: '#043ca4', color: '#ffffff', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showASHPElecLine} onChange={handleShowASHPElecLine} />
                    Electricity consumption for air-source heat pumps
                </label>
                <label style={{ backgroundColor: '#a60909', color: '#ffffff', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showGSHPElecLine} onChange={handleShowGSHPElecLine} />
                    Electricity Consumption for ground source heat pumps
                </label>
                <label style={{ backgroundColor: '#7309b9', color: '#ffffff', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px' , marginLeft: '15px'}} type="checkbox" checked={showGasConsLine} onChange={handleShowGasConsLine} />
                    Gas consumption of gas boilers
                </label>
            </div>
        </>
    )
}