import { ResponsiveAreaBump } from '@nivo/bump';
import React, {useEffect, useState} from "react";
export default function ResistanceHeatersHeatProduced({data}) {

    const [heatData, setHeatData] = useState([]);
    const [average, setAverage] = useState([]);
    const [time, setTime] = useState([]);

    useEffect(() => {
        const fetchHeatData = async () => {
            try {
                const fetchData = await fetch('http://localhost:8082/data/halfhourlyheatingprofile');
                const fetchDataResponse = await fetchData.json();
                setHeatData(fetchDataResponse);
            } catch (error) {
                console.error("Error occurs when fetching data", error);
            }
        };
        fetchHeatData();
        // console.log(heatData[0][ "UK_daily_average_OAT_[degrees_C]"]);
    }, []);

    useEffect(() => {
        const fetchAverageData = async () => {
            try {
                const averages = heatData.map(entry => entry["UK_daily_average_OAT_[degrees_C]"]);
                setAverage((averages));
            } catch (error) {
                console.error("Error occurs when fetching data", error);
            }
        };
        fetchAverageData();
    }, []);

    useEffect(() => {
        const fetchTimeData = async () => {
            try {
                const times = heatData.map(entry => entry["index"]);
                setTime((times));
            } catch (error) {
                console.error("Error occurs when fetching data", error);
            }
        };
        fetchTimeData();
    }, []);

    // const heatProducedAreaBumpChart = () => (
    //     <ResponsiveBump
    //         data={data}
    //         margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
    //         colors={{ scheme: 'nivo' }} // You can customize the color scheme
    //         lineWidth={3} // Adjust line width as needed
    //         activeLineWidth={6}
    //         inactiveLineWidth={3}
    //         inactiveOpacity={0.15}
    //         pointSize={10} // Size of data points
    //         activePointSize={16}
    //         inactivePointSize={0}
    //         pointColor={{ theme: 'background' }}
    //         pointBorderWidth={3}
    //         activePointBorderWidth={3}
    //         pointBorderColor={{ from: 'serie.color' }}
    //         enableGridX={false}
    //         enableGridY={false}
    //         axisTop={null}
    //         axisRight={null}
    //         axisBottom={null}
    //         axisLeft={null}
    //         animate
    //         motionStiffness={90}
    //         motionDamping={15}
    //     />
    // );
    return(
        <>
            <h1>Graph here - Heat produced</h1>
            {average.length > 0 ? (
                <ul>
                    {average.map((average, index) => (
                        <li key={index}>{average}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}

            {time.length > 0 ? (
                <ul>
                    {time.map((time, index) => (
                        <li key={index}>{time}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}