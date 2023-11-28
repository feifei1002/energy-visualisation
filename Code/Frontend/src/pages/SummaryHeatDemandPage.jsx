import React, { useState, useEffect } from 'react';
//import visualisation components
import HeatDemandPieChart from '../components/graphs/HeatDemandPieChart.jsx';
import HeatDemandSummaryChart from '../components/graphs/HeatDemandSummaryChart';
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import Header from "../Header.jsx";

export default function SummaryOfHeatDemandPage() {
    const [heatDemandData, setHeatDemandData] = useState(null);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const heatDemandResponse = await fetch('http://localhost:8082/data/summary');
                const geoJsonResponse = await fetch('http://localhost:8082/data/geojson'); // Replace with your GeoJSON endpoint

                if (!heatDemandResponse.ok || !geoJsonResponse.ok) throw new Error('Data fetch failed');

                const heatData = await heatDemandResponse.json();
                const geoData = await geoJsonResponse.json();


                setHeatDemandData(heatData);
                setGeoJsonData(geoData);
            } catch (error) {
                console.error("Error fetching data:", error);
                //handle errors next
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!heatDemandData || !geoJsonData) {
        return <div>Error: Data not available</div>;
    }

    return (
        <div>
            <Header />
            <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
            <HeatDemandPieChart data={heatDemandData} geoJsonData={geoJsonData} />
            <HeatDemandSummaryChart data={heatDemandData} />
        </div>
    );
}
