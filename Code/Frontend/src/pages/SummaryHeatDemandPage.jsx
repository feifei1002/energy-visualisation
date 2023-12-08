import React, { useState, useEffect } from 'react';
import HeatDemandPieChart from '../components/graphs/HeatDemandPieChart.jsx';
import HeatDemandSummaryChart from '../components/graphs/HeatDemandSummaryChart';
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import Header from "../Header.jsx";
import Switch from 'react-switch';
import HeatDemandPieChartAverage from "../components/graphs/HeatDemandPieChartAverage.jsx";
import HeatDemandSummaryChartAverage from "../components/graphs/HeatDemandSummaryChartAverage.jsx";
import '../css/Visualisations.css';

//analytics tracking
import trackEvent from '../utils/analytics';

export default function SummaryOfHeatDemandPage() {

    //analytics tracking
    let userLocation = null;
    navigator.geolocation.getCurrentPosition((position) => {
        userLocation = `${position.coords.latitude}, ${position.coords.longitude}`;
    });
    //log user viewing page, data gotten through cache not csv so cant name csvname so we name dataname
    const pageUrl = window.location.href;
    trackEvent('DataView', null, pageUrl, userLocation, {DataName: 'aggregatedHeatDemandData.cache' });


    const [heatDemandData, setHeatDemandData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPieChart, setShowPieChart] = useState(true); // State to toggle between pie and bar charts

    useEffect(() => {
        async function fetchData() {
            try {
                const heatDemandResponse = await fetch('http://localhost:8082/data/summary');

                if (!heatDemandResponse.ok) throw new Error('Data fetch failed');

                const heatData = await heatDemandResponse.json();

                setHeatDemandData(heatData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const toggleChartType = () => {
        setShowPieChart(!showPieChart);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!heatDemandData) {
        return <div>Error: Data not available</div>;
    }

    return (
        <div>
            <Header />
            <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ marginRight: '10px' }}>Bar Chart</span>
                <Switch
                    onChange={toggleChartType}
                    checked={showPieChart}
                    onColor="#007BFF"
                    offColor="#333"
                    checkedIcon={false}
                    uncheckedIcon={false}
                />
                <span style={{ marginLeft: '10px' }}>Pie Chart</span>
            </div>
            <div className="chart-container">
            {showPieChart ? (
                <>
                    <HeatDemandPieChart data={heatDemandData} />
                    <HeatDemandPieChartAverage data={heatDemandData} />
                </>
            ) : (
                <>
                    <HeatDemandSummaryChart data={heatDemandData} />
                    <HeatDemandSummaryChartAverage data={heatDemandData} />
                </>
            )}
            </div>
        </div>
    );
}
