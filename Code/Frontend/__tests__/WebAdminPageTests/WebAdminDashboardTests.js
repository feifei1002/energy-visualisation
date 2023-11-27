import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import WebAdminDashboard from '../../src/pages/WebAdminDashboard';

// Mock axios
jest.mock('axios');

// Testing web admin dashboard component
describe('WebAdminDashboard Component', () => {

  // Mock web admin details
  const mockWebAdminDetails = {
    username: 'admin_user',
    email: 'admin@example.com',
    fullName: 'Admin User',
  };

  // Mock all user details
  const mockAllUserDetails = [
    { username: 'jane_doe', email: 'jane.doe@example.com' },
  ];

  // Mock admin user
  const mockUser = 'admin_user';

  // Mock axios requests
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    // Mocking axios requests
    mockAxios.reset();
  });

  it('renders web admin dashboard page', async () => {
    // Mock the web admin details endpoint
    mockAxios.onGet(`/api/webadmin/user/${mockUser}`).reply(200, mockWebAdminDetails);

    // Mock the all user details endpoint
    mockAxios.onGet('/api/getallusers').reply(200, mockAllUserDetails);

    // Mock render the component
    render(
      <MemoryRouter initialEntries={['/webadmindashboard']} initialIndex={0}>
          <WebAdminDashboard />
      </MemoryRouter>
    );

    // Wait for page to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('webadmincontainer')).toBeInTheDocument();
    });
  });
});