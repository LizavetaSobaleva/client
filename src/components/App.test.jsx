import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
import { auth } from '../actions/user';

jest.mock('../actions/user', () => ({
  auth: jest.fn().mockReturnValue({ type: 'SET_USER' }),
}));

jest.mock('../actions/file', () => ({
    getFiles: jest.fn(() => ({ type: 'GET_FILES' })),
    getStructure: jest.fn(() => ({ type: 'GET_STRUCTURE' })),
}));

const mockStore = configureStore([]);
let store;

const initialState = {
    user: { isAuth: false, currentUser: { name: 'John Doe', avatar: 'avatar.png' } },
    files: { currentDir: 'root', dirStructure: [], files: [] },
    app: { view: 'list' },
    upload: { files: [], isVisible: false },
  };

const renderComponent = (store) =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe('App Component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  test('renders App without crashing', () => {
    const { asFragment } = renderComponent(store);
    expect(screen.getByTestId('app')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders login container when not authenticated', () => {
    const { asFragment } = renderComponent(store);
    expect(screen.getByTestId('loginContainer')).toBeInTheDocument();
    expect(screen.queryByTestId('contentContainer')).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders content container when authenticated', () => {
    store = mockStore({
      ...initialState,
      user: { isAuth: true, currentUser: { name: 'John Doe', avatar: 'avatar.png' } },
    });
    const { asFragment } = renderComponent(store);
    expect(screen.getByTestId('contentContainer')).toBeInTheDocument();
    expect(screen.queryByTestId('loginContainer')).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('auth action is dispatched on mount', () => {
    renderComponent(store);
    expect(store.dispatch).toHaveBeenCalledWith(auth());
  });
});
