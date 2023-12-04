import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import ContactUsForm from '../../src/components/ContactUsForm';
import React from 'react';

// Mocking axios to prevent actual API calls during tests
jest.mock('axios');

describe('ContactUsForm', () => {
  it('renders the contact form correctly', () => {
    render(<ContactUsForm />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/Full Name/i));
    expect(screen.getByLabelText(/Your Email/i));
    expect(screen.getByLabelText(/Subject:/i));
    expect(screen.getByLabelText(/Your Message/i));
  });

  it('to render text areas for user input with a send button to send the feedback', async () => {
    render(<ContactUsForm />); 
    //Expect 4 text areas
    const textArea = screen.getAllByRole('textbox')
    expect(textArea.length).toBe(4);

    //Expect a send button to send the feedback
    expect(screen.getByRole('button', { name: /Send/i }));
  });
});