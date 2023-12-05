import React from 'react';
import { render, screen } from '@testing-library/react';
import SummaryOfHeatDemandPage from '../../src/pages/SummaryHeatDemandPage'; // Adjust the import path accordingly
import '@testing-library/jest-dom'
describe('SummaryOfHeatDemandPage', () => {
    /*it('renders loading message initially', () => {
        render(<SummaryOfHeatDemandPage />);

        // Check if the loading message is rendered using a text matcher function
        const loadingMessage = screen.getByText((content, element) => {
            return content.includes('Loading');
        });
        expect(loadingMessage).toBeInTheDocument();
    });*/


    it('renders error message if data is not available', async () => {
        // Mock the fetch requests to simulate data fetch failure
        global.fetch = jest.fn(() => Promise.reject('Data fetch failed'));

        render(<SummaryOfHeatDemandPage />);

        // Wait for the component to re-render after fetch
        await screen.findByText('Error: Data not available', {}, { timeout: 5000 }); // Increase timeout if needed

        const errorMessage = screen.getByText('Error: Data not available');
        expect(errorMessage).toBeInTheDocument();
    });


    /*it('renders bar chart by default', async () => {
        // Mock the fetch requests to provide sample data
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]), // Provide an empty data array for testing
            })
        );

        render(<SummaryOfHeatDemandPage />);

        // Wait for the component to re-render after fetch
        await screen.findByTestId('bar-chart'); // Use findByTestId to find the bar chart

        // Check if the bar chart is rendered
        const barChart = screen.getByTestId('bar-chart'); // Adjust the data-testid accordingly
        expect(barChart).toBeInTheDocument();
    });*/


    /*it('toggles between pie and bar charts', async () => {
        // Mock the fetch requests to provide sample data
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]), // Provide an empty data array for testing
            })
        );

        render(<SummaryOfHeatDemandPage />);

        // Wait for the component to re-render after fetch
        await screen.findByText('Bar Chart');

        // Check if the bar chart is initially rendered
        let barChart = screen.queryByTestId('bar-chart'); // Adjust the data-testid accordingly
        expect(barChart).toBeInTheDocument();

        // Toggle to pie chart
        const pieChartToggle = screen.getByRole('checkbox');
        pieChartToggle.click();

        // Check if the pie chart is now rendered
        barChart = screen.queryByTestId('bar-chart'); // Adjust the data-testid accordingly
        expect(barChart).not.toBeInTheDocument();

        const pieChart = screen.getByTestId('pie-chart'); // Adjust the data-testid accordingly
        expect(pieChart).toBeInTheDocument();
    });*/
});
