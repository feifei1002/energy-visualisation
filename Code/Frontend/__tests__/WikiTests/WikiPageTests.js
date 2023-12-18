import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import WikiLandingPage from '../../src/pages/Wiki/WikiLandingPage';
import WikiHeatDemand from '../../src/pages/Wiki/WikiHeatDemand';
import WikiResistanceHeaters from '../../src/pages/Wiki/WikiResistanceHeaters';
import WikiHeatBreakDown from '../../src/pages/Wiki/WikiHeatBreakDown';
import { MemoryRouter } from 'react-router-dom';
import 'react-router-dom';

describe('WikiLandingPage', () => {
  test('renders WikiLandingPage component', () => {
    render(
      <MemoryRouter>
      <WikiLandingPage />
      </MemoryRouter>);

    // Check the presence of WikiDropDownMenu
    expect(screen.getByText(/Data Sets/i)).toBeInTheDocument();
    expect(screen.getByText("Here you can find information about the type of datasets used within our website and explanation on the terms used.")).toBeInTheDocument();
    expect(screen.getByText("Please use the drop-down below to go the wiki section for a specific data set and it's graphs:")).toBeInTheDocument();
  });
});

describe('WikiHeatDemand', () => {
  test('renders WikiHeatDemand component', () => {
    render(<WikiHeatDemand />);

    // Check if the "Show Transcript" button is rendered
    expect(screen.getByText('Show Transcript')).toBeInTheDocument();

    // Check if the table with header "Table Terms" is rendered
    expect(screen.getByText('Table Terms')).toBeInTheDocument();

    // Check if the terms in the table are rendered
    expect(screen.getByText('LSOA Code')).toBeInTheDocument();
    expect(screen.getByText('KWh')).toBeInTheDocument();
    expect(screen.getByText('GWh')).toBeInTheDocument();

    // Check if the "Read more about the dataset used" link is rendered
    expect(screen.getByText('Read more about the dataset used')).toBeInTheDocument();
  });
});

describe('WikiHeatBreakDown', () => {
  test('renders WWikiHeatBreakDown component', () => {
    render(<WikiHeatBreakDown />);

    // Check if the "Show Transcript" button is rendered
    expect(screen.getByText('Show Transcript')).toBeInTheDocument();

    // Check if the "Read more about the dataset used" link is rendered
    expect(screen.getByText('Read more about the dataset used')).toBeInTheDocument();
  });
});

describe('WikiResistanceHeaters', () => {
  test('renders WikiResistanceHeaters component', () => {
    render(<WikiResistanceHeaters />);

    // Check if the table with header "Table Terms" is rendered
    expect(screen.getByText('Table Terms')).toBeInTheDocument();

    // Check if the terms in the table are rendered
    expect(screen.getByText('UK daily OAT')).toBeInTheDocument();
    expect(screen.getByText('KWh')).toBeInTheDocument();
    expect(screen.getByText('GWh')).toBeInTheDocument();
    expect(screen.getByText('Heat Production')).toBeInTheDocument();

    // Check if the "Read more about the dataset used" link is rendered
    expect(screen.getByText('Read more about the dataset used')).toBeInTheDocument();
  });
});