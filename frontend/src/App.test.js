import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Component/Login/Login';
import Navbar from './Component/Navbar/Navbar';


// Sign up button is present or not
test('sign up button', () => {
  render(<Navbar />);
  const buttonElement = screen.queryByRole("button",{name:'sign in', exact: false})
  expect(buttonElement).toBeInTheDocument();
});


test('sign out button', () => {
  render(<Navbar />);
  const buttonElement = screen.queryByRole("button",{name:'sign out', exact: false})
  expect(buttonElement).not.toBeInTheDocument();
});


// test('Valid email format', () => {
//   render(<Login />);
//   const emailInput = screen.queryByRole("input",{name:'your email', exact: false});

//   // Test with an invalid email
//   fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
//   expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();

//   // Test with a valid email
//   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//   expect(screen.queryByText(/invalid email address/i)).not.toBeInTheDocument();
// });

  

describe('Login Component', () => {
  const mockSetShowLogin = jest.fn();

  beforeEach(() => {
    render(<Login setShowLogin={mockSetShowLogin} />);
  });

  test('renders sign up form by default', () => {
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('toggles to login form', () => {
    fireEvent.click(screen.getByText(/login here/i));
    // expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Your Name')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('toggles back to sign up form', () => {
    fireEvent.click(screen.getByText(/login here/i));
    fireEvent.click(screen.getByText(/click here/i));
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('closes the login form when close icon is clicked', () => {
    fireEvent.click(screen.getByRole('img', { name: '' }));
    expect(mockSetShowLogin).toHaveBeenCalledWith(false);
  });

});




