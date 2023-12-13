// Import necessary dependencies for testing
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreakDownOfImprovementCostsHeatTechnology from "../../src/components/graphs/BreakDownOfImprovementCostsHeatTechnology";

// Sample test data for the BreakDownOfImprovementCostsHeatTechnology component
const testData = [
    {
        "LSOA11CD": "E01000001",
        "Area (km2)": 0.135739831,
        "Average energy efficiency improvements costs of detached gas boiler (GBP)": 13221.20,
        "Average energy efficiency improvements costs of semi-detached oil boiler (GBP)": 14589.64,
        "Average energy efficiency improvements costs of flat resistance heating (GBP)": 17483.12,
        "Average energy efficiency improvements costs of terraced biomass boiler (GBP)": 12367.98,
        "Local Authority (2011)": "City of London",
        "Local Authority (2019)": "City of London"
    },
    {
        "LSOA11CD": "E01000002",
        "Area (km2)": 0.223719826,
        "Average energy efficiency improvements costs of detached gas boiler (GBP)": 13221.20,
        "Average energy efficiency improvements costs of semi-detached oil boiler (GBP)": 14589.64,
        "Average energy efficiency improvements costs of flat resistance heating (GBP)": 17483.12,
        "Average energy efficiency improvements costs of terraced biomass boiler (GBP)": 12367.98,
        "Local Authority (2011)": "City of London",
        "Local Authority (2019)": "City of London"
    },
];

// Test suite for the BreakDownOfImprovementCostsHeatTechnology component
describe('BreakDownOfImprovementCostsHeatTechnology', () => {
    // Test case: rendering the table when data is available
    it('renders table when data is available', () => {
        render(<BreakDownOfImprovementCostsHeatTechnology costData={testData} localAuthority="City of London"/>);

        // Check if the table is rendered by looking for table headers
        const tableHeaders = screen.getAllByRole('columnheader');
        expect(tableHeaders).toHaveLength(3); // Assuming there are three columns: "Colour", "Dwelling Type", and "Heat Demand Percentage"

        // Check if individual table rows are rendered
        const tableRows = screen.getAllByRole('row');
        expect(tableRows).toHaveLength(5); // Assuming the table has a header row and four data rows for different dwelling types
    });

    // Test case: showing the correct heat technology on the pie chart
    it('shows the correct heat technology on pie chart', () => {
        render(<BreakDownOfImprovementCostsHeatTechnology costData={testData} localAuthority="City of London"/>);

        // Check if detached type is shown on the pie chart
        const typeCell = screen.getByText('gas boiler');
        expect(typeCell).toBeInTheDocument();

        // Check if semi-detached type is shown on the pie chart
        const typeCell2 = screen.getByText('oil boiler');
        expect(typeCell2).toBeInTheDocument();

        // Check if flat type is shown on the pie chart
        const typeCell3 = screen.getByText('resistance heating');
        expect(typeCell3).toBeInTheDocument();

        // Check if terraced type is shown on the pie chart
        const typeCell4 = screen.getByText('biomass boiler');
        expect(typeCell4).toBeInTheDocument();
    });
});
