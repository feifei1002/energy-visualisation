import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from "../../src/Header"
import { BrowserRouter } from 'react-router-dom';


//Test header
describe('Header component', () => {
  // Test case: Renders header correctly
  it('renders header correctly', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);

    // Assertions for header
    expect(screen.getByText('Modular Heat and Cooling Report')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Wiki')).toBeInTheDocument();
    expect(screen.getByText('Visualisations')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});