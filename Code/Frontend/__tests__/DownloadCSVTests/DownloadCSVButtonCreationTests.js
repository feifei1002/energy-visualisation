import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ElectricityDemandForHeatPumps from "../../src/components/graphs/ElectricityDemandForHeatPumps.jsx";

URL.createObjectURL = jest.fn();
describe('ElectricityDemandForHeatPumps', () => {
    it('renders the Download CSV button', () => {
        // Arrange
        const testData = [
            { x: "2013-01-01T00:00:00" , y: 0.0000894006878634641*100000 },
            { x: "2013-01-01T00:00:00", y: 7.3},
            {x: "2013-01-01T00:00:00" , y: 0.0000894006878634641*100000},
        ];
        render(<ElectricityDemandForHeatPumps data={testData} />);

        // Act
        const downloadButton = screen.getByText('Download CSV');

        // Assert
        expect(downloadButton).toBeInTheDocument();
    });

    it('calls handleDownloadCSV when the button is clicked', () => {
        // Arrange
        const testData = [
            { x: "2013-01-01T00:00:00" , y: 0.0000894006878634641*100000 },
            { x: "2013-01-01T00:00:00", y: 7.3},
            {x: "2013-01-01T00:00:00" , y: 0.0000894006878634641*100000},
        ];
        const handleDownloadCSVMock = jest.fn();
        render(<ElectricityDemandForHeatPumps data={testData} />);
        const downloadButton = screen.getByText('Download CSV');

        // Act
        fireEvent.click(downloadButton);

        // Assert
        expect(handleDownloadCSVMock).toHaveBeenCalled(); // Make sure to update this based on your actual implementation
    });
});