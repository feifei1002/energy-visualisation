import {ResponsiveLine} from "@nivo/line";
import React, {useState} from "react";


export default function GasConsumedAndElectricityDemand({data}) {

    // set each line on the graph as separate, so they can be selected
    const [showASHPElecLine, setShowASHPElecLine] = useState(true);
    const [showGSHPElecLine, setShowGSHPElecLine] = useState(true);
    const [showGasConsLine, setShowGasConsLine] = useState(true);

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
            id: 'electricity consumption for air-source heat pumps',
            color: 'hsl(214,100%,67%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.ASHeatPumpsElec
            })),
        },
        {
            // for grouns source heat pumps
            id: 'electricity consumption for ground source heat pumps',
            color: 'hsl(0,97%,41%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.GSHeatPumpsElec
            })),
        },
        {
            // gas consumption
            id: 'gas consumption of gas boilers',
            color: 'hsl(155,90%,53%)',
            data: formatData.map((item) => ({
                x: item.time,
                y: item.boilerGasConsumption
            })),
        },
        // {
            // id: 'outside temperature',
            // color: 'hsl(500, 70%, 50%)',
            // data: formatData.map((item) => ({
            //     x: item.time,
            //     y: item.temperature,
            // })),
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
    })

    // output to page
    return(
        <>

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
                        legend: "GWh",
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
                    enableGridX={false}
                    colors={(d) => d.color}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={3}
                    pointBorderColor={{ from: 'serieColor' }}
                />
            </div>

            {/*  checkboxes  */}
            <div>
                <label style={{ color: '#589fff', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showASHPElecLine} onChange={handleShowASHPElecLine} />
                    Electricity consumption for air-source heat pumps
                </label>
                <label style={{ color: '#d00303', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px', marginLeft: '15px' }} type="checkbox" checked={showGSHPElecLine} onChange={handleShowGSHPElecLine} />
                    Electricity Consumption for ground source heat pumps
                </label>
                <label style={{ color: '#1cf399', fontWeight: 'bold'}}>
                    <input style={{ marginRight: '2px' , marginLeft: '15px'}} type="checkbox" checked={showGasConsLine} onChange={handleShowGasConsLine} />
                    Gas consumption of gas boilers
                </label>
            </div>
        </>
    )
}