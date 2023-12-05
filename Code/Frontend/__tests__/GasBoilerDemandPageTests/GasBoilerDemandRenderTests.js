import {render, screen} from "@testing-library/react";
import GasConsumedAndElectricityDemand from "../../src/components/graphs/GasConsumedAndElectricityDemand.jsx";
import React from "react";
import '@testing-library/jest-dom';

// test data to use when rendering the graph
const testData = [
    {
        "id": "electricity consumption for air-source heat pumps",
        "data": [
            {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
        ]},
    {
        "id": "electricity consumption for ground source heat pumps",
        "data": [
            {"x": "2013-01-01T00:00:00", "y": 7.3},
        ]},
    {
        "id": "gas consumption of gas boilers",
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
        const checkboxOne = screen.getByText('Electricity Consumption for Air Source Heat Pumps');
        expect(checkboxOne).toBeInTheDocument();

        const checkboxTwo = screen.getByText('Electricity Consumption for Ground Source Heat Pumps');
        expect(checkboxTwo).toBeInTheDocument();

        const checkboxThree = screen.getByText('Gas Consumption of Gas Boilers');
        expect(checkboxThree).toBeInTheDocument();
    });

    it('inputting a number to change the half-hourly data', () => {

        // render graph page
        render(<GasConsumedAndElectricityDemand data={testData} />);

        // gets the user input box
        const userInput = screen.getByTestId('userInput');
        // tests that the input box exists on the page
        expect(userInput).toBeInTheDocument();
    })
});
