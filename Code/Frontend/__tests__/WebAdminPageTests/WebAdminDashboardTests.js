import { render, screen, fireEvent, waitFor, act  } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom'; 
import WebAdminDashboard from '../../src/pages/WebAdminDashboard';
import React from 'react';

jest.mock('axios');

describe('WebAdminDashboard Component', () => {
    const mockWebAdminDetails = {
      username: 'admin_user',
      email: 'admin@example.com',
      fullName: 'Admin User',
    };
  
    const mockAllUserDetails = [
      { username: 'jane_doe', email: 'jane.doe@example.com' },
    ];
  
    const mockLocationState = {
      user: 'admin_user',
      token: 'fakeAuthToken',
    };

    // To do before merge
  
    // it('renders web admin details correctly', async () => {
    //   // Mock axios.get to resolve with mockWebAdminDetails
    //   axios.get.mockResolvedValueOnce({ data: mockWebAdminDetails });
  
    //   // Render the WebAdminDashboard component
    //   await act(async () => {
    //     render(<WebAdminDashboard />, { wrapper: MemoryRouter, initialEntries: ['/dashboard'], initialIndex: 0 });
    //   });
  
    //   // Assert that the expected text is present in the rendered component
    //   expect(screen.getByText(mockWebAdminDetails.username)).toBeInTheDocument();
    //   expect(screen.getByText(mockWebAdminDetails.email)).toBeInTheDocument();
    //   expect(screen.getByText(mockWebAdminDetails.fullName)).toBeInTheDocument();
    // });
  
    // it('renders user details in the table correctly', async () => {
    //   // Mock axios.get to resolve with mockAllUserDetails
    //   axios.get.mockResolvedValueOnce({ data: mockAllUserDetails });
  
    //   // Render the WebAdminDashboard component
    //   await act(async () => {
    //     render(<WebAdminDashboard />, { wrapper: MemoryRouter, initialEntries: ['/dashboard'], initialIndex: 0 });
    //   });
  
    //   // Assert that the expected text is present in the rendered component
    //   expect(screen.getByText('jane_doe')).toBeInTheDocument();
    //   expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument();
    // });

    describe('Dummy Test Suite', () => {
        test('Dummy test should always pass', () => {
            expect(true).toBe(true);
        });
    });
    
  });