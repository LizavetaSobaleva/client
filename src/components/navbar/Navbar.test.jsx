import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';

jest.mock('../../actions/file', () => ({
  getFiles: jest.fn().mockReturnValue({ type: 'SET_FILES', type: 'SET_LOADER' }),
  searchFiles: jest.fn().mockReturnValue({ type: 'SET_FILES', type: 'SET_LOADER' }),
}));

jest.mock('../../reducers/appReducer', () => ({
  showLoader: jest.fn().mockReturnValue({ type: 'SET_LOADER' }),
}));

const mockStore = configureStore([]);
let store;

const renderComponent = (store) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );

describe('Navbar Component', () => {
  beforeEach(() => {
    store = mockStore({
      user: { isAuth: false, currentUser: { name: 'John Doe', avatar: null } },
      files: { currentDir: 'root' },
    });
    store.dispatch = jest.fn(); // Mock the store.dispatch function
  });

  test('renders Navbar without crashing', () => {
    const { asFragment } = renderComponent(store);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('navbarContent')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders login and register buttons when user is not authenticated', () => {
    const { asFragment } = renderComponent(store);
    expect(screen.getByTestId('loginButtonLink')).toBeInTheDocument();
    expect(screen.getByTestId('registerButtonLink')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders search input and user info when user is authenticated', () => {
    store = mockStore({
      user: { isAuth: true, currentUser: { name: 'John Doe', avatar: null } },
      files: { currentDir: 'root' },
    });
    const { asFragment } = renderComponent(store);
    expect(screen.getByTestId('searchInput')).toBeInTheDocument();
    expect(screen.getByTestId('userMessage')).toHaveTextContent('Hello, John Doe!');
    expect(asFragment()).toMatchSnapshot();
  });

  test('search input triggers searchFiles action', () => {
    store = mockStore({
      user: { isAuth: true, currentUser: { name: 'John Doe', avatar: null } },
      files: { currentDir: 'root' },
    });
    store.dispatch = jest.fn(); // Mock the store.dispatch function

    renderComponent(store);
    fireEvent.change(screen.getByTestId('searchInput'), { target: { value: 'test' } });
    expect(store.dispatch).toHaveBeenCalledWith(showLoader());

    jest.useFakeTimers();
    fireEvent.change(screen.getByTestId('searchInput'), { target: { value: 'test' } });
    jest.advanceTimersByTime(500);
    expect(store.dispatch).toHaveBeenCalledWith(searchFiles('test'));
    jest.useRealTimers();
  });

  test('search input triggers getFiles action when cleared', () => {
    store = mockStore({
      user: { isAuth: true, currentUser: { name: 'John Doe', avatar: null } },
      files: { currentDir: 'root' },
    });
    store.dispatch = jest.fn(); // Mock the store.dispatch function

    renderComponent(store);
    fireEvent.change(screen.getByTestId('searchInput'), { target: { value: 'test' } });
    fireEvent.change(screen.getByTestId('searchInput'), { target: { value: '' } });
    expect(store.dispatch).toHaveBeenCalledWith(getFiles('root'));
  });
});
