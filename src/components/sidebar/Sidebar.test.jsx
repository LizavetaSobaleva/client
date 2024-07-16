import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import { logout } from '../../reducers/userReducer';

const mockStore = configureStore([]);
let store;

const renderComponent = (store) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>
  );

describe('Sidebar Component', () => {
  beforeEach(() => {
    store = mockStore({
      user: { isAuth: true, currentUser: { name: 'John Doe', avatar: null } },
      files: { dirStructure: [{ _id: '1', name: 'Dir 1', path: 'dir1', idPath: ['1'], childs: [] }] }
    });
    store.dispatch = jest.fn();
  });

  test('renders Sidebar without crashing', () => {
    renderComponent(store);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebarContent')).toBeInTheDocument();
  });

  test('renders sidebar header with logo and title', () => {
    renderComponent(store);
    expect(screen.getByTestId('sidebarHeader')).toBeInTheDocument();
    expect(screen.getByTestId('sidebarLogo')).toBeInTheDocument();
    expect(screen.getByText('MERN cloud')).toBeInTheDocument();
  });

  test('renders navigation and logout button', () => {
    renderComponent(store);
    expect(screen.getByTestId('sidebarNavigation')).toBeInTheDocument();
    expect(screen.getByTestId('sidebarLogout')).toBeInTheDocument();
  });

  test('logout button triggers logout action', () => {
    renderComponent(store);
    fireEvent.click(screen.getByTestId('logoutButton'));
    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });

  test('toggles sidebar compression on button click', () => {
    renderComponent(store);
    const sidebar = screen.getByTestId('sidebar');
    const compressButton = screen.getByTestId('compressButton');
    expect(sidebar).not.toHaveClass('compressed');
    fireEvent.click(compressButton);
    expect(sidebar).toHaveClass('compressed');
    fireEvent.click(compressButton);
    expect(sidebar).not.toHaveClass('compressed');
  });
});
