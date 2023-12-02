import {fireEvent, getByLabelText, getByText, render, screen} from "@testing-library/react";
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

describe('tests for rendering the checkboxes for the graph', () => {
    // tests checkboxes are automatically ticked
    it('renders the page and checks the checkboxes are already checked', () => {

        // fetching the test data
        render(<GasConsumedAndElectricityDemand data={testData}></GasConsumedAndElectricityDemand>);

        // gets the checkboxes as separate variables
        const ASHPElectricityCheckbox = screen.getByLabelText("Electricity Consumption for Air Source Heat Pumps");
        const GSHPElectricityCheckbox = screen.getByLabelText("Electricity Consumption for Ground Source Heat Pumps");
        const gasConsumptionCheckbox = screen.getByLabelText("Gas Consumption of Gas Boilers");

        // expects checkboxes to be ticked
        expect(ASHPElectricityCheckbox).toBeChecked();
        expect(GSHPElectricityCheckbox).toBeChecked();
        expect(gasConsumptionCheckbox).toBeChecked();
    })

    // unchecking a checkbox makes the graph change
    it('when checkbox state changes the graph should update accordingly', () => {

        // renders page
        render(<GasConsumedAndElectricityDemand data={testData}></GasConsumedAndElectricityDemand>);
        // the checkbox should be checked vwhen the page is loaded
        const gasConsumptionCheckbox = screen.getByText('Gas Consumption of Gas Boilers').closest('label').querySelector('input');
        expect(gasConsumptionCheckbox).toBeChecked();

        // clicks the checkbox to change its state
        fireEvent.click(gasConsumptionCheckbox);

        // The checkbox should not be checked now
        expect(gasConsumptionCheckbox).not.toBeChecked();
    });

    // checks three checkboxes are present on the page
    it('checks the correct number of checkboxes are rendered', () => {

        // renders graph page
        render(<GasConsumedAndElectricityDemand data={testData}></GasConsumedAndElectricityDemand>);

        // checks if 3 checkboxes are rendered
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(3);
    });

    // checks the user input box can be changed
    it('increasing the user input value by one', () => {

        // render the graph page with test data
        render(<GasConsumedAndElectricityDemand data={testData}></GasConsumedAndElectricityDemand>);

        // gets the input box
        const userInputBox = screen.getByTestId('userInput')
        // changes the value of the input box from 1 to 2
        fireEvent.change(userInputBox, { target: { newValue: '2' } });

        // test that the input box has been changed
        expect(userInputBox.newValue).toBe('2');
    })
});
