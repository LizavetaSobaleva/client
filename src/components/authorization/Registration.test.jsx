import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Registration from './Registration';

const mockStore = configureStore([]);
const store = mockStore({});

jest.mock('../../actions/user', () => ({
  registration: jest.fn(),
}));

describe('Registration Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Registration />
        </MemoryRouter>
      </Provider>
    );
  });

  test('renders Registration form without crashing', () => {
    expect(screen.getByTestId('formTitle')).toBeInTheDocument();
    expect(screen.getByTestId('nameInput')).toBeInTheDocument();
    expect(screen.getByTestId('emailInput')).toBeInTheDocument();
    expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
    expect(screen.getByTestId('registerButton')).toBeInTheDocument();
    expect(screen.getByTestId('loginLink')).toBeInTheDocument();
  });

  test('allows user to input name', () => {
    const nameInput = screen.getByTestId('nameInput');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');
  });

  test('allows user to input email', () => {
    const emailInput = screen.getByTestId('emailInput');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(emailInput).toHaveValue('john.doe@example.com');
  });

  test('allows user to input password', () => {
    const passwordInput = screen.getByTestId('passwordInput');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  test('register button triggers registration action', () => {
    const { registration } = require('../../actions/user');

    fireEvent.change(screen.getByTestId('nameInput'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('emailInput'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByTestId('registerButton'));

    expect(registration).toHaveBeenCalledWith('John Doe', 'john.doe@example.com', 'password123', expect.any(Function));
  });
});
