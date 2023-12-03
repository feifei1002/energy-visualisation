import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ElectricityDemandForHeatPumps from "../../src/components/graphs/ElectricityDemandForHeatPumps.jsx";
jest.mock("../../src/helperFunctions/downloadCSV.js", () => ({
    __esModule: true,
    default: jest.fn(),
}));

test.only("Check for download CSV button creation is ElectricityDemandForHeatPumps page", () => {
    const { getByText } = render(<ElectricityDemandForHeatPumps></ElectricityDemandForHeatPumps>);
    const downloadCSVButton = getByText("Download CSV");
    expect(downloadCSVButton).toBeInTheDocument();
});

test.only("Check handleDownloadCSV is being called when the button is clicked", () => {
    const { getByText } = render(<ElectricityDemandForHeatPumps></ElectricityDemandForHeatPumps>);
    const downloadCSVButton = getByText("Download CSV");
    const handleDownloadCSVMock = jest.spyOn(ElectricityDemandForHeatPumps.prototype, "handleDownloadCSV");
    fireEvent.click(downloadCSVButton);
    expect(handleDownloadCSVMock).toHaveBeenCalledTimes(1);
});