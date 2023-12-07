import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import WikiLandingPage from '../../src/pages/Wiki/WikiLandingPage';
import WikiHeatDemand from '../../src/pages/Wiki/WikiHeatDemand';
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