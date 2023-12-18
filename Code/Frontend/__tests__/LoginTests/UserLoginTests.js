import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import React from "react";
import Login from "../../src/pages/Login.jsx";
import {MemoryRouter} from "react-router-dom";
import '@testing-library/jest-dom';

describe('component tests for the login page', () => {
    // testing the login page renders without the page crashing
    it('page renders without crashing', () => {

        // if the component renders without crashing, the test will pass
        render(
            // memory router has to be used for rendering the login page
            <MemoryRouter>
            <Login/>
            </MemoryRouter>);
    });

    it('username and passport input box renders', async () => {
        // renders login page
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>);

        // get components for the input boxes
        const usernameInput = screen.getByTestId('username-input');
        const passwordInput = screen.getByTestId('password-input');

        // tests that each input box is in the page
        await waitFor(() => {
            expect(usernameInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
        });
    });

    it('inputted data into the username input box', () => {
        // renders login page
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>);

        // get component for username input
        const usernameInput = screen.getByTestId('username-input');

        // inputs the string 'username123' into the input box
        fireEvent.change(usernameInput, { target: { value: 'username123' } });
        // tests that the inputted value is correct
        expect(usernameInput.value).toBe('username123')
    })

    it('inputted data into the password input box', () => {
        // renders the login page
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>);

        // check each checkbox option is shown
        const passwordInput = screen.getByTestId('password-input');

        // inputs the string 'password123' into the input box
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        // tests that the inputted value is correct
        expect(passwordInput.value).toBe('password123')
    })

    it('renders correctly', () => {
        // renders the login page
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>);

        // Check if the text content is rendered
        expect(screen.getByText('Forgot password? contact webadmin@climatedata.com')).toBeInTheDocument();
        expect(screen.getByText('Show Password')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.getByText('User Name')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Show Password')).toBeInTheDocument();
    })
});
