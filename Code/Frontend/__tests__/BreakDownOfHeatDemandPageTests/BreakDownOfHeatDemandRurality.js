import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import BreakDownOfHeatDemandRurality from '../../src/components/graphs/BreakDownOfHeatDemandRurality';
import '@testing-library/jest-dom'

// Sample test data for the BreakDownOfHeatDemandRurality component
const testData = [
    {
      "LSOA11CD": "E01000001",
        "Area (km2)": 0.135739831,
        "Average heat demand after energy efficiency measures for detached biomass boiler (kWh)": 13221.200322729735,
        "Average heat demand after energy efficiency measures for detached gas boiler (kWh)": 14589.644077982724,
        "Average heat demand after energy efficiency measures for detached oil boiler (kWh)": 20442.88709003453,
        "Average heat demand after energy efficiency measures for detached resistance heating (kWh)": 5550.939151840999,
        "Average heat demand after energy efficiency measures for flat biomass boiler (kWh)": 3410.15873015873,
        "Average heat demand after energy efficiency measures for flat gas boiler (kWh)": 4880.555555555554,
        "Average heat demand after energy efficiency measures for flat oil boiler (kWh)": 8115.289346063978,
        "Average heat demand after energy efficiency measures for flat resistance heating (kWh)": 1878.2170831779188,
        "Average heat demand after energy efficiency measures for semi-detached biomass boiler (kWh)": 8384.13646738717,
        "Average heat demand after energy efficiency measures for semi-detached gas boiler (kWh)": 11176.994056933589,
        "Average heat demand after energy efficiency measures for semi-detached oil boiler (kWh)": 13178.966362117755,
        "Average heat demand after energy efficiency measures for semi-detached resistance heating (kWh)": 3812.403972707936,
        "Average heat demand after energy efficiency measures for terraced biomass boiler (kWh)": 7475.750706061542,
        "Average heat demand after energy efficiency measures for terraced gas boiler (kWh)": 17289.999999999996,
        "Average heat demand after energy efficiency measures for terraced oil boiler (kWh)": 11664.662458327664,
        "Average heat demand after energy efficiency measures for terraced resistance heating (kWh)": 2658.37570427374,
        "Average heat demand before energy efficiency measures for detached biomass boiler (kWh)": 20875.19512086178,
        "Average heat demand before energy efficiency measures for detached gas boiler (kWh)": 22255.992657350296,
        "Average heat demand before energy efficiency measures for detached oil boiler (kWh)": 33141.41672297774,
        "Average heat demand before energy efficiency measures for detached resistance heating (kWh)": 10228.077961518446,
        "Average heat demand before energy efficiency measures for flat biomass boiler (kWh)": 3977.072310405644,
        "Average heat demand before energy efficiency measures for flat gas boiler (kWh)": 6501.515151515151,
        "Average heat demand before energy efficiency measures for flat oil boiler (kWh)": 12937.408383942113,
        "Average heat demand before energy efficiency measures for flat resistance heating (kWh)": 2535.3785900783296,
        "Average heat demand before energy efficiency measures for semi-detached biomass boiler (kWh)": 12979.552672499918,
        "Average heat demand before energy efficiency measures for semi-detached gas boiler (kWh)": 16912.665791856532,
        "Average heat demand before energy efficiency measures for semi-detached oil boiler (kWh)": 21490.58787143911,
        "Average heat demand before energy efficiency measures for semi-detached resistance heating (kWh)": 7003.306852855303,
        "Average heat demand before energy efficiency measures for terraced biomass boiler (kWh)": 11399.77427193158,
        "Average heat demand before energy efficiency measures for terraced gas boiler (kWh)": 21735,
        "Average heat demand before energy efficiency measures for terraced oil boiler (kWh)": 18130.40810398572,
        "Average heat demand before energy efficiency measures for terraced resistance heating (kWh)": 4018.826439466813,
        "Local Authority (2011)": "City of London",
        "Local Authority (2019)": "City of London",
        "Number of detached biomass boiler in 2018": 0,
        "Number of detached gas boiler in 2018": 0,
        "Number of detached oil boiler in 2018": 0,
        "Number of detached resistance heating in 2018": 0,
        "Number of flat biomass boiler in 2018": 0,
        "Number of flat gas boiler in 2018": 95,
        "Number of flat oil boiler in 2018": 12,
        "Number of flat resistance heating in 2018": 680,
        "Number of semi-detached biomass boiler in 2018": 0,
        "Number of semi-detached gas boiler in 2018": 2,
        "Number of semi-detached oil boiler in 2018": 0,
        "Number of semi-detached resistance heating in 2018": 0,
        "Number of terraced biomass boiler in 2018": 0,
        "Number of terraced gas boiler in 2018": 1,
        "Number of terraced oil boiler in 2018": 0,
        "Number of terraced resistance heating in 2018": 10,
        "Road length (m)": 2298.2045786239,
        "Rurality": "Urban",
        "Total heat demand after energy efficiency measures 2018 (kWh)": 1904451.611648135,
        "Total heat demand before energy efficiency measures 2018 (kWh)": 2592698.8772328906
    },
    {
      "LSOA11CD": "E01000002",
      "Area (km2)": 0.223719826,
      "Average heat demand after energy efficiency measures for detached biomass boiler (kWh)": 13221.200322729735,
      "Average heat demand after energy efficiency measures for detached gas boiler (kWh)": 14589.644077982724,
      "Average heat demand after energy efficiency measures for detached oil boiler (kWh)": 20442.88709003453,
      "Average heat demand after energy efficiency measures for detached resistance heating (kWh)": 5550.939151840999,
      "Average heat demand after energy efficiency measures for flat biomass boiler (kWh)": 3410.15873015873,
      "Average heat demand after energy efficiency measures for flat gas boiler (kWh)": 5353.638234193785,
      "Average heat demand after energy efficiency measures for flat oil boiler (kWh)": 8115.289346063978,
      "Average heat demand after energy efficiency measures for flat resistance heating (kWh)": 2634.589083675245,
      "Average heat demand after energy efficiency measures for semi-detached biomass boiler (kWh)": 8384.13646738717,
      "Average heat demand after energy efficiency measures for semi-detached gas boiler (kWh)": 11176.994056933589,
      "Average heat demand after energy efficiency measures for semi-detached oil boiler (kWh)": 13178.966362117755,
      "Average heat demand after energy efficiency measures for semi-detached resistance heating (kWh)": 3812.403972707936,
      "Average heat demand after energy efficiency measures for terraced biomass boiler (kWh)": 7475.750706061542,
      "Average heat demand after energy efficiency measures for terraced gas boiler (kWh)": 17289.999999999996,
      "Average heat demand after energy efficiency measures for terraced oil boiler (kWh)": 11664.662458327664,
      "Average heat demand after energy efficiency measures for terraced resistance heating (kWh)": 2658.37570427374,
      "Average heat demand before energy efficiency measures for detached biomass boiler (kWh)": 20875.19512086178,
      "Average heat demand before energy efficiency measures for detached gas boiler (kWh)": 22255.992657350296,
      "Average heat demand before energy efficiency measures for detached oil boiler (kWh)": 33141.41672297774,
      "Average heat demand before energy efficiency measures for detached resistance heating (kWh)": 10228.077961518446,
      "Average heat demand before energy efficiency measures for flat biomass boiler (kWh)": 3977.072310405644,
      "Average heat demand before energy efficiency measures for flat gas boiler (kWh)": 7363.709981167608,
      "Average heat demand before energy efficiency measures for flat oil boiler (kWh)": 12937.408383942113,
      "Average heat demand before energy efficiency measures for flat resistance heating (kWh)": 4093.414563388453,
      "Average heat demand before energy efficiency measures for semi-detached biomass boiler (kWh)": 12979.552672499918,
      "Average heat demand before energy efficiency measures for semi-detached gas boiler (kWh)": 16912.665791856532,
      "Average heat demand before energy efficiency measures for semi-detached oil boiler (kWh)": 21490.58787143911,
      "Average heat demand before energy efficiency measures for semi-detached resistance heating (kWh)": 7003.306852855303,
      "Average heat demand before energy efficiency measures for terraced biomass boiler (kWh)": 11399.77427193158,
      "Average heat demand before energy efficiency measures for terraced gas boiler (kWh)": 21735,
      "Average heat demand before energy efficiency measures for terraced oil boiler (kWh)": 18130.40810398572,
      "Average heat demand before energy efficiency measures for terraced resistance heating (kWh)": 4018.826439466813,
      "Local Authority (2011)": "City of London",
      "Local Authority (2019)": "City of London",
      "Number of detached biomass boiler in 2018": 0,
      "Number of detached gas boiler in 2018": 0,
      "Number of detached oil boiler in 2018": 0,
      "Number of detached resistance heating in 2018": 0,
      "Number of flat biomass boiler in 2018": 0,
      "Number of flat gas boiler in 2018": 50,
      "Number of flat oil boiler in 2018": 8,
      "Number of flat resistance heating in 2018": 717,
      "Number of semi-detached biomass boiler in 2018": 0,
      "Number of semi-detached gas boiler in 2018": 1,
      "Number of semi-detached oil boiler in 2018": 0,
      "Number of semi-detached resistance heating in 2018": 0,
      "Number of terraced biomass boiler in 2018": 0,
      "Number of terraced gas boiler in 2018": 4,
      "Number of terraced oil boiler in 2018": 0,
      "Number of terraced resistance heating in 2018": 32,
      "Road length (m)": 3603.8079792779,
      "Rurality": "Urban",
      "Total heat demand after energy efficiency measures 2018 (kWh)": 2387009.616067045,
      "Total heat demand before energy efficiency measures 2018 (kWh)": 3639118.119934233
  },
];

describe('BreakDownOfHeatDemandRurality', () => {
  it('renders table when data is available', () => {
    render(<BreakDownOfHeatDemandRurality heatData={testData} localAuthority="City of London" />);

    // Check if the table is rendered by looking for table headers
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(2); // Assuming there are two columns: "Rurality Type" and "Heat Demand Percentage"

    // Check if individual table rows are rendered
    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(4); // Assuming the table has a header row and three data rows for different rurality types
  });

  it('shows the correct percentage format on pie chart', () => {
    render(<BreakDownOfHeatDemandRurality heatData={testData} localAuthority="City of London" />);

    //Check percentage value is shown and formatted correctly
    const percentageCell = screen.getByText('100%');
    expect(percentageCell).toBeInTheDocument();
  });

  
  it('shows the correct rurality types on pie chart', () => {
    render(<BreakDownOfHeatDemandRurality heatData={testData} localAuthority="City of London" />);
    
    //Check urban rurality type is shown on pie chart
    const typeCell = screen.getByText('Urban');
    expect(typeCell).toBeInTheDocument();

    //Check hamlet & isolated rurality type is shown on pie chart
    const typeCell2 = screen.getByText('Hamlet & Isolated Dwellings');
    expect(typeCell2).toBeInTheDocument();

    //Check village, town and fringe rurality type is shown on pie chart
    const typeCell3 = screen.getByText('Village, Town and Fringe');
    expect(typeCell3).toBeInTheDocument();
  });
});