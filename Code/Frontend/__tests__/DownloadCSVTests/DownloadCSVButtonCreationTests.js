import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ElectricityDemandForHeatPumps from "../../src/components/graphs/ElectricityDemandForHeatPumps.jsx";
import * as downloadCSV from '../../src/helperFunctions/downloadCSV';
import ResistanceHeatersProducedAndConsumed from "../../src/components/graphs/ResistanceHeatersProducedAndConsumed.jsx";


jest.mock("../../src/helperFunctions/downloadCSV");
describe('ElectricityDemandForHeatPumps', () => {
    it('renders the Download CSV button', () => {
        const testData = [
            { "x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000 },
            { "x": "2013-01-01T00:00:00", "y": 7.3},
            {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
        ];

        //Pass the test data into the page
        render(<ElectricityDemandForHeatPumps data={testData}></ElectricityDemandForHeatPumps>);

        //Check if the Download CSV button exist in the ElectricityDemandForHeatPumps page
        const downloadButton = screen.getByText('Download CSV');
        expect(downloadButton).toBeDefined();
        //Check if the button is correctly being rendered
        expect(downloadButton.tagName).toBe('BUTTON');
        //Check if the button being rendered is the Download CSV button
        expect(downloadButton.textContent).toBe('Download CSV');
    });

    it('calls downloadCSV when the button is clicked', () => {
        const testData = [
            { "x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000 },
            { "x": "2013-01-01T00:00:00", "y": 7.3},
            {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
        ];

        //Pass the test data into the page
        render(<ElectricityDemandForHeatPumps data={testData}></ElectricityDemandForHeatPumps>);

        //Check if the Download CSV button exist in the ElectricityDemandForHeatPumps page
        const downloadButton = screen.getByText('Download CSV');

        //Perform click action on the button
        fireEvent.click(downloadButton);

        //Check if the downloadCSV function is being called when the button is clicked
        expect(downloadCSV.default).toHaveBeenCalled();
    });
});

describe('ResistanceHeatersProducedAndConsumed', () => {
    it('renders the Download CSV button', () => {
        const testData = [
            { "x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000 },
            { "x": "2013-01-01T00:00:00", "y": 7.3},
            {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
        ];

        //Pass the test data into the page
        render(<ResistanceHeatersProducedAndConsumed data={testData}></ResistanceHeatersProducedAndConsumed>);

        //Check if the Download CSV button exist in the ElectricityDemandForHeatPumps page
        const downloadButton = screen.getByText('Download CSV');
        expect(downloadButton).toBeDefined();
        //Check if the button is correctly being rendered
        expect(downloadButton.tagName).toBe('BUTTON');
        //Check if the button being rendered is the Download CSV button
        expect(downloadButton.textContent).toBe('Download CSV');
    });

    it('calls downloadCSV when the button is clicked', () => {
        const testData = [
            { "x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000 },
            { "x": "2013-01-01T00:00:00", "y": 7.3},
            {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
        ];

        //Pass the test data into the page
        render(<ResistanceHeatersProducedAndConsumed data={testData}></ResistanceHeatersProducedAndConsumed>);

        //Check if the Download CSV button exist in the ElectricityDemandForHeatPumps page
        const downloadButton = screen.getByText('Download CSV');

        //Perform click action on the button
        fireEvent.click(downloadButton);

        //Check if the downloadCSV function is being called when the button is clicked
        expect(downloadCSV.default).toHaveBeenCalled();
    });
});