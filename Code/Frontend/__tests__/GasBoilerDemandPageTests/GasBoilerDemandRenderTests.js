import {render, screen} from "@testing-library/react";
import GasConsumedAndElectricityDemand from "../../src/components/graphs/GasConsumedAndElectricityDemand.jsx";
import React from "react";
import '@testing-library/jest-dom';

// test data to use when rendering the graph
const testData = [
    {
        "id": "electricity consumption for air-source heat pumps",
        "color": "hsl(219,95%,33%)",
        "data": [
            {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
        ]},
    {
        "id": "electricity consumption for ground source heat pumps",
        "color": "hsl(0,90%,34%)",
        "data": [
            {"x": "2013-01-01T00:00:00", "y": 7.3},
        ]},
    {
        "id": "gas consumption of gas boilers",
        "color": "hsl(276,91%,38%)",
        "data": [
            {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
        ]},
]

describe('tests to check the page and graph renders correctly', () => {
    // testing the graph renders without the page crashing
    it('component renders without crashing', () => {

        // if the component renders without crashing, the test will pass
        render(<GasConsumedAndElectricityDemand data={testData}></GasConsumedAndElectricityDemand>);
    });

    // checks each checkbox option is rendered
    it('checkboxes render on the page', () => {
        render(<GasConsumedAndElectricityDemand data={testData} />);

        // check each checkbox option is shown
        const checkboxOne = screen.getByText('Electricity consumption for air-source heat pumps');
        expect(checkboxOne).toBeInTheDocument();

        const checkboxTwo = screen.getByText('Electricity Consumption for ground source heat pumps');
        expect(checkboxTwo).toBeInTheDocument();

        const checkboxThree = screen.getByText('Gas consumption of gas boilers');
        expect(checkboxThree).toBeInTheDocument();
    });
});
