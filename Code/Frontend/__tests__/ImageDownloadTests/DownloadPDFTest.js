import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ElectricityDemandForHeatPumps from "../../src/components/graphs/ElectricityDemandForHeatPumps.jsx";
import graphToPdf from '../../src/helperFunctions/graphToPdf.js'; 
import BreakDownOfHeatDemandDwellings from "../../src/components/graphs/BreakDownOfHeatDemandDwellings.jsx";


jest.mock("../../src/helperFunctions/graphToPdf");
describe('BreakdownOfHeatDemandDwellings', () => {
    it('renders the Download PDF button', () => {
        const testData = [
            {
              "LSOA11CD": "E01000001",
              "Area (km2)": 0.135739831,
              "Average heat demand after energy efficiency measures for detached biomass boiler (kWh)": 13221.20,
              "Average heat demand after energy efficiency measures for detached gas boiler (kWh)": 14589.64,
              "Local Authority (2011)": "City of London",
              "Local Authority (2019)": "City of London",
              "Number of detached biomass boiler in 2018": 0,
              "Number of detached gas boiler in 2018": 0,
              "Total heat demand after energy efficiency measures 2018 (kWh)": 1904451.61,
              "Total heat demand before energy efficiency measures 2018 (kWh)": 2592698.88
            },
            {
              "LSOA11CD": "E01000002",
              "Area (km2)": 0.223719826,
              "Average heat demand after energy efficiency measures for detached biomass boiler (kWh)": 13221.20,
              "Average heat demand after energy efficiency measures for detached gas boiler (kWh)": 14589.64,
              "Local Authority (2011)": "City of London",
              "Local Authority (2019)": "City of London",
              "Number of detached biomass boiler in 2018": 0,
              "Number of detached gas boiler in 2018": 0,
              "Total heat demand after energy efficiency measures 2018 (kWh)": 2387009.62,
              "Total heat demand before energy efficiency measures 2018 (kWh)": 3639118.12
            },
          ];
        
        //Pass the test data into the page
        render(<BreakDownOfHeatDemandDwellings heatData={testData} localAuthority="City of London" ></BreakDownOfHeatDemandDwellings>);

        //Check if the Download PDF button exists in the BreakdownOfHeatDemand page
        const downloadButton = screen.getByText('Generate PDF');
        expect(downloadButton).toBeDefined();
        //Check if the button is correctly being rendered
        expect(downloadButton.tagName).toBe('BUTTON');
        //Check if the button being rendered is the Download PDF button
        expect(downloadButton.textContent).toBe('Generate PDF');
    });

    it('calls generate pdf when the button is clicked', () => {
        const testData = [
            {
              "LSOA11CD": "E01000001",
              "Area (km2)": 0.135739831,
              "Average heat demand after energy efficiency measures for detached biomass boiler (kWh)": 13221.20,
              "Average heat demand after energy efficiency measures for detached gas boiler (kWh)": 14589.64,
              "Local Authority (2011)": "City of London",
              "Local Authority (2019)": "City of London",
              "Number of detached biomass boiler in 2018": 0,
              "Number of detached gas boiler in 2018": 0,
              "Total heat demand after energy efficiency measures 2018 (kWh)": 1904451.61,
              "Total heat demand before energy efficiency measures 2018 (kWh)": 2592698.88
            },
            {
              "LSOA11CD": "E01000002",
              "Area (km2)": 0.223719826,
              "Average heat demand after energy efficiency measures for detached biomass boiler (kWh)": 13221.20,
              "Average heat demand after energy efficiency measures for detached gas boiler (kWh)": 14589.64,
              "Local Authority (2011)": "City of London",
              "Local Authority (2019)": "City of London",
              "Number of detached biomass boiler in 2018": 0,
              "Number of detached gas boiler in 2018": 0,
              "Total heat demand after energy efficiency measures 2018 (kWh)": 2387009.62,
              "Total heat demand before energy efficiency measures 2018 (kWh)": 3639118.12
            },
          ];
        

        //Pass the test data into the page
        render(<BreakDownOfHeatDemandDwellings heatData={testData} localAuthority="City of London" ></BreakDownOfHeatDemandDwellings>);

        //Check if the Download PDF button exists in the breakdown of heat demand page
        const downloadButton = screen.getByText('Generate PDF');

        //Perform click action on the button
        fireEvent.click(downloadButton);

        //Check if the graphToPdf function is being called when the button is clicked
        expect(graphToPdf).toHaveBeenCalled();
    });
});