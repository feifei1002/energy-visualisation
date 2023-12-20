import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ElectricityDemandForHeatPumps from "../../src/components/graphs/ElectricityDemandForHeatPumps.jsx";
import graphToImage from '../../src/helperFunctions/graphToImage.js'; 
import ResistanceHeatersProducedAndConsumed from "../../src/components/graphs/ResistanceHeatersProducedAndConsumed.jsx";
import domtoimage from 'dom-to-image';

jest.mock("../../src/helperFunctions/downloadCSV");

jest.mock('dom-to-image', () => {
    const actualExport = jest.requireActual("dom-to-image");
    return{...actualExport};
});
describe('ElectricityDemandForHeatPumps', () => {
    it('renders the Download Image button', () => {
        const testData = [
            { "x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000 },
            { "x": "2013-01-01T00:00:00", "y": 7.3},
            {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
        ];

        //Pass the test data into the page
        render(<ElectricityDemandForHeatPumps data={testData}></ElectricityDemandForHeatPumps>);

        //Check if the Download Image button exist in the ElectricityDemandForHeatPumps page
        const downloadButton = screen.getByText('Download Graph As Image');
        expect(downloadButton).toBeDefined();
        //Check if the button is correctly being rendered
        expect(downloadButton.tagName).toBe('BUTTON');
        //Check if the button being rendered is the Download IMAGE button
        expect(downloadButton.textContent).toBe('Download Graph As Image');
        //Fire download
        fireEvent.click(downloadButton);
    });

    it('should create a download link for image downloading', () => {
        // Mock the required objects and functions
        const data = [
            { x: "2013-01-01T00:00:00" , y: 0.0000894006878634641*100000 },
            { x: "2013-01-01T00:00:00", y: 7.3},
            {x: "2013-01-01T00:00:00" , y: 0.0000894006878634641*100000},
        ];
        const filename = "test_data.csv";

        const createObjectURLMock = jest.fn();
        const appendChildMock = jest.fn();
        const clickMock = jest.fn();
        const removeChildMock = jest.fn();
        
        //Mock the necessary DOM functions
        URL.createObjectURL = createObjectURLMock;
        document.body.appendChild = appendChildMock;
        document.body.removeChild = removeChildMock;

        //Mock a download link
        jest.spyOn(document, 'createElement').mockImplementation(() => ({
            href: null,
            download: null,
            click: clickMock,
        }));

        //Call the function
        graphToImage(data, filename);
    });  
});