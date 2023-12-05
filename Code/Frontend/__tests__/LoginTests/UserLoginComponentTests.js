import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import Login from "../../src/pages/Login.jsx";
import {MemoryRouter} from "react-router-dom";
import '@testing-library/jest-dom';


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('component tests for the login page', () => {
    // testing the graph renders without the page crashing
    it('page renders without crashing', () => {

        // if the component renders without crashing, the test will pass
        render(
            <MemoryRouter>
            <Login/>
            </MemoryRouter>);
    });

    // checks each checkbox option is rendered
    it('username input box renders', async () => {
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>);

        // check each checkbox option is shown
        const usernameInput = screen.getByTestId('username-input');
        // expect(usernameInput).toBeInTheDocument();
        // Wait for page to be loaded
        await waitFor(() => {
            expect(usernameInput).toBeInTheDocument();
        });

    });

    // it('inputting a number to change the half-hourly data', () => {
    //
    //     // render graph page
    //     render(<GasConsumedAndElectricityDemand data={testData} />);
    //
    //     // gets the user input box
    //     const userInput = screen.getByTestId('userInput');
    //     // tests that the input box exists on the page
    //     expect(userInput).toBeInTheDocument();
    // })
});
