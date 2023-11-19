import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import ResistanceHeatersProducedAndConsumed from "../../src/components/graphs/ResistanceHeatersProducedAndConsumed.jsx";
import '@testing-library/jest-dom';


const testData = [
    {
        "id": "Heat Production",
        "color": "hsl(181, 70%, 50%)",
        "data": [
            {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
        ]},
    {
        "id": "Electricity Consumption",
        "color": "hsl(329, 70%, 50%)",
        "data": [
            {"x": "2013-01-01T00:00:00", "y": 7.3},
        ]},
    {
        "id": "UK daily OAT",
        "color": "hsl(5, 70%, 50%)",
        "data": [
            {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
        ]},
]
describe('ResistanceHeatersProducedAndConsumed', () => {
    it('renders the page with checkboxes being checked', () => {

        //fetching the testData
        render(<ResistanceHeatersProducedAndConsumed data={testData}></ResistanceHeatersProducedAndConsumed>);

        //Check if the checkboxes are being rendered and checked
        const heatProdCheckbox = screen.getByLabelText("Heat Production");
        const electricityConsumeCheckbox = screen.getByLabelText("Electricity Consumption");
        const ukOATCheckbox = screen.getByLabelText("UK daily OAT");

        //Checkboxes have to be checked when the graph first launched

        expect(heatProdCheckbox).toBeChecked();
        expect(electricityConsumeCheckbox).toBeChecked();
        expect(ukOATCheckbox).toBeChecked();
    })
})

describe('ResistanceHeatersProducedAndConsumed', () => {
    it('renders the page with checkboxes being unchecked', () => {

        //fetching the testData
        render(<ResistanceHeatersProducedAndConsumed data={testData}></ResistanceHeatersProducedAndConsumed>);

        //Check if the checkboxes are being rendered and checked
        const heatProdCheckbox = screen.getByLabelText("Heat Production");
        const electricityConsumeCheckbox = screen.getByLabelText("Electricity Consumption");
        const ukOATCheckbox = screen.getByLabelText("UK daily OAT");

        //Uncheck the checkboxes
        fireEvent.click(heatProdCheckbox);
        fireEvent.click(electricityConsumeCheckbox);
        fireEvent.click(ukOATCheckbox);

        //Check if the checkboxes are unchecked

        expect(heatProdCheckbox).not.toBeChecked();
        expect(electricityConsumeCheckbox).not.toBeChecked();
        expect(ukOATCheckbox).not.toBeChecked();
    })
})
