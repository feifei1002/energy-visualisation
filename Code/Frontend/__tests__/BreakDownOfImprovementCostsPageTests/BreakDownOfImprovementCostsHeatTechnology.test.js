import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreakDownOfImprovementCostsHeatingTech from '../../src/components/graphs/BreakDownOfImprovementCostsHeatingTech';

// Sample test data for the BreakDownOfImprovementCostsHeatingTech component
const testData = [
    {
        "Local Authority (2019)": "City of London",
        "Average energy efficiency improvements costs of detached gas boiler (GBP)": 1200,
        "Average energy efficiency improvements costs of detached oil boiler (GBP)": 800,
    },
    {
        "Local Authority (2019)": "City of London",
        "Average energy efficiency improvements costs of flat gas boiler (GBP)": 1000,
        "Average energy efficiency improvements costs of flat oil boiler (GBP)": 700,
    },
];

describe('BreakDownOfImprovementCostsHeatingTech', () => {
    it('renders table when data is available', () => {
        render(<BreakDownOfImprovementCostsHeatingTech localAuthority="City of London" />);

        // Check if the table is rendered by looking for table headers
        const tableHeaders = screen.getAllByRole('columnheader');
        expect(tableHeaders).toHaveLength(3); // Assuming there are three columns: "Colour", "Heating Technology" and "Cost"

        // Check if individual table rows are rendered
        const tableRows = screen.getAllByRole('row');
        // Assuming the table has a header row and data rows for different heating technologies
        expect(tableRows).toHaveLength(5); // Update the count based on your data
    });
});
