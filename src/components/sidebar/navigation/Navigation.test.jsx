import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';
import { clearStack, setCurrentDir } from '../../../reducers/fileReducer';

const mockStore = configureStore([]);
let store;

const renderComponent = (store) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    </Provider>
  );

describe('Navigation Component', () => {
  beforeEach(() => {
    store = mockStore({
      files: { dirStructure: [{ _id: '1', name: 'Dir 1', path: 'dir1', idPath: ['1'], childs: [] }] }
    });
    store.dispatch = jest.fn();
  });

  test('renders Navigation without crashing', () => {
    renderComponent(store);
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('navigationItem')).toBeInTheDocument();
  });

  test('renders navigation title and icon', () => {
    renderComponent(store);
    expect(screen.getByTestId('navigationTitle')).toHaveTextContent('My Cloud');
    expect(screen.getByTestId('navigationIcon')).toBeInTheDocument();
  });

  test('opens and closes dropdown correctly', () => {
    renderComponent(store);
    const dropdown = screen.getByTestId('navigationDropdown');
    const content = screen.getByTestId('navigationContent');
    expect(content).toHaveClass('visible');
    fireEvent.click(dropdown);
    expect(content).not.toHaveClass('visible');
    fireEvent.click(dropdown);
    expect(content).toHaveClass('visible');
  });

  test('clicking My Cloud link triggers correct actions', () => {
    renderComponent(store);
    const navLink = screen.getByTestId('navLink');
    fireEvent.click(navLink);
    expect(store.dispatch).toHaveBeenCalledWith(clearStack());
    expect(store.dispatch).toHaveBeenCalledWith(setCurrentDir(null));
  });

  test('renders directory structure correctly', () => {
    renderComponent(store);
    expect(screen.getByTestId('navigationElement')).toBeInTheDocument();
    expect(screen.getByText('Dir 1')).toBeInTheDocument();
  });
});
