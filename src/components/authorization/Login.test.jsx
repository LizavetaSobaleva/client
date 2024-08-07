import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { login } from '../../actions/user';

jest.mock('../../actions/user', () => ({
  login: jest.fn().mockReturnValue({ type: 'SET_USER' }),
}));

const mockStore = configureStore([]);
const store = mockStore({});

describe('Login Component', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  };

  test('renders Login form without crashing', () => {
    const { asFragment } = renderComponent();
    expect(screen.getByTestId('formTitle')).toBeInTheDocument();
    expect(screen.getByTestId('emailInput')).toBeInTheDocument();
    expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
    expect(screen.getByTestId('loginButton')).toBeInTheDocument();
    expect(screen.getByTestId('registrationLink')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('allows user to input email', () => {
    renderComponent();
    const emailInput = screen.getByTestId('emailInput');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(emailInput).toHaveValue('john.doe@example.com');
  });

  test('allows user to input password', () => {
    renderComponent();
    const passwordInput = screen.getByTestId('passwordInput');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  test('login button triggers login action', () => {
    renderComponent();
    fireEvent.change(screen.getByTestId('emailInput'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByTestId('loginButton'));

    expect(store.dispatch).toHaveBeenCalledWith(login('john.doe@example.com', 'password123'));
  });
});
