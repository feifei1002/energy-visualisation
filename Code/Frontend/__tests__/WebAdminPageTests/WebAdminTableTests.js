import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import WebAdminUsersTable from '../../src/components/tables/WebAdminUsersTable';

jest.mock('axios');

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

describe('WebAdminUsersTable Component', () => {
  it('renders table correctly', () => {
    render(<WebAdminUsersTable columns={columns} data={data} authToken={authToken} />);

    expect(screen.getByText('User Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders users correctly', () => {
    render(<WebAdminUsersTable columns={columns} data={data} authToken={authToken} />);

    expect(screen.getByText('jane_doe')).toBeInTheDocument();
    expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument();
    
    expect(screen.getByText('john_doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });
});