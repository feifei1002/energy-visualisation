import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterRequest from "../../src/components/RegisterRequest"
import { BrowserRouter } from 'react-router-dom';

//Test Register Requests
describe('Register Requests component', () => {
  // Test case: Renders Register Requests correctly
  it('renders register requests correctly', () => {
    render(<BrowserRouter><RegisterRequest /></BrowserRouter>);

    // Assertion for Register Requests
    expect(screen.getByText('Show Register Requests')).toBeInTheDocument();
  });
});