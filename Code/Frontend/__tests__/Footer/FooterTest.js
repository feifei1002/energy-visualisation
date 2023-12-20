import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from "../../src/Footer"

//Test footer
describe('Footer component', () => {
  // Test case: Renders footer correctly
  it('renders footer correctly', () => {
    render(<Footer />);

    // Assertion for footer
    expect(screen.getByText('Follow us on LinkedIn')).toBeInTheDocument();
  });
});