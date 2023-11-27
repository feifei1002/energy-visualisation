import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import WebAdminUsersTable from '../../src/components/tables/WebAdminUsersTable';

// Mocking Axios to prevent actual HTTP requests during testing
jest.mock('axios');

// Define columns and sample user data for testing
const columns = [
  {
    Header: 'User Name',
    accessor: 'username',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
];

const data = [
  {
    fullName: 'John Doe',
    username: 'john_doe',
    password: 'hashed_password_1',
    email: 'john.doe@example.com',
    approved: true,
  },
  {
    fullName: 'Jane Doe',
    username: 'jane_doe',
    password: 'hashed_password_2',
    email: 'jane.doe@example.com',
    approved: false,
  },
];

const authToken = 'fakeAuthToken';

// Jest test suite for WebAdminUsersTable Component
describe('WebAdminUsersTable Component', () => {
  // Test case: Renders table headers correctly
  it('renders table correctly', () => {
    render(<WebAdminUsersTable columns={columns} data={data} authToken={authToken} />);

    // Assertions for table headers
    expect(screen.getByText('User Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  // Test case: Renders user details correctly
  it('renders users correctly', () => {
    render(<WebAdminUsersTable columns={columns} data={data} authToken={authToken} />);

    // Assertions for user details
    expect(screen.getByText('jane_doe')).toBeInTheDocument();
    expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('john_doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  // Test case: Shows reset password button next to each user
  it('shows reset password button next to a user', () => {
    render(<WebAdminUsersTable columns={columns} data={data} authToken={authToken} />);

    // Assertions for reset password buttons
    const resetPasswordButtons = screen.getAllByTestId('ResetPasswordButton');
    expect(resetPasswordButtons).toHaveLength(2);
  });

  // Test case: Updates content dynamically
  it('updates content dynamically', () => {
    // Define new data for dynamic update
    const newData = [
      { username: 'new_user', email: 'new.user@example.com' },
    ];

    render(<WebAdminUsersTable columns={columns} data={newData} authToken={authToken} />);

    // Assertions for updated content
    expect(screen.getByText('new_user')).toBeInTheDocument();
    expect(screen.getByText('new.user@example.com')).toBeInTheDocument();
  });
});