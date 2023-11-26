import {render, screen} from "@testing-library/react";
import GasConsumedAndElectricityDemand from "../../src/components/graphs/GasConsumedAndElectricityDemand.jsx";
import React from "react";
import '@testing-library/jest-dom';

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

describe('tests for the page at /visualisations/halfhourlygasboilers', () => {
    // testing the graph renders without the page crashing
    test('component renders without crashing', () => {

        // if the component renders without crashing, the test will pass
        render(<GasConsumedAndElectricityDemand data={testData}></GasConsumedAndElectricityDemand>);
    });

    // tests checkboxes are automatically ticked
    test('renders the page and checks the checkboxes are already checked', () => {

        // fetching the test data
        render(<GasConsumedAndElectricityDemand data={testData}></GasConsumedAndElectricityDemand>);

        // gets the checkboxes as separate variables
        const ASHPElectricityCheckbox = screen.getByLabelText("Electricity consumption for air-source heat pumps");
        const GSHPElectricityCheckbox = screen.getByLabelText("Electricity Consumption for ground source heat pumps");
        const gasConsumptionCheckbox = screen.getByLabelText("Gas consumption of gas boilers");

        // expects checkboxes to be ticked
        expect(ASHPElectricityCheckbox).toBeChecked();
        expect(GSHPElectricityCheckbox).toBeChecked();
        expect(gasConsumptionCheckbox).toBeChecked();
    })
});
