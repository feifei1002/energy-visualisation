import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../src/components/LogoutButton';
import NotificationContext from "../../src/contexts/NotificationContext"

jest.mock('axios'); // Mock axios module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LogoutButton', () => {
  beforeEach(() => {
    // Clear mocks and reset state before each test
    jest.clearAllMocks();
  });

  it('renders Logout button', () => {
    render(<LogoutButton></LogoutButton>);
    //Check if the Logout button exists 
    const logOutButton = screen.getByText('Logout');
    expect(logOutButton).toBeDefined();
  });
});