import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    beforeEach(() => {
        render(<ContactForm />)
    })
});

test('renders the contact form header', ()=> {
    const h1 = document.querySelector('h1')
    expect(h1.textContent).toBe('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const firstNameField = screen.getByLabelText(/first name*/i); 
    userEvent.type(firstNameField, "123"); 

    const errorMessage = await screen.findAllByTestId('error')
    expect(errorMessage).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const submitButton = screen.getByRole("button"); 
    userEvent.click(submitButton);
    await waitFor(() => {
        const errorMessage = screen.queryAllByTestId("error"); 
        expect(errorMessage).toHaveLength(3)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const firstNameField = screen.getByLabelText(/first name*/i); 
    userEvent.type(firstNameField, "caitlin"); 

    const lastNameField = screen.getByLabelText(/last name*/i); 
    userEvent.type(lastNameField, "talbert"); 

    const submitButton = screen.getByRole("button"); 
    userEvent.click(submitButton)

    const errorMessage = await screen.getAllByTestId("error"); 
    expect(errorMessage).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    const emailField = screen.getByLabelText(/email*/i); 
    userEvent.type(emailField, "zerotalb@yahoo.com"); 

    const errorMessage = await screen.findByText(/email must be a valid email address/i); 
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const submitBtn = screen.getByRole("button"); 
    userEvent.click(submitBtn); 

    const errorMessage = await screen.findByText(/last name is a required field/i); 
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const firstNameField = screen.getByLabelText(/first name*/i)
    const lastNameField = screen.getByLabelText(/last name*/i)
    const emailField = screen.getByLabelText(/email*/i)

    userEvent.type(firstNameField, "caitlin");
    userEvent.type(firstNameField, "talbert"); 
    userEvent.type(firstNameField, "zerotalb@yahoo.com"); 
    
    const submitBtn = screen.getByRole("button"); 
    userEvent.click(submitBtn); 

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText("first name")
        const lastNameDisplay = screen.queryByText("last name")
        const emailDisplay = screen.queryByText("email")
        const messageDisplay = screen.queryByText("message")

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    })

});

test('renders all fields text when all fields are submitted.', async () => {
});