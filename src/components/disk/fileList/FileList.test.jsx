import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FileList from './FileList';
import { setCurrentDir, popFromStack } from '../../../reducers/fileReducer';


jest.mock('./file/File', () => ({ file }) => <div>{file.name}</div>);

const mockStore = configureStore([]);

const files = [
  { _id: '1', name: 'Test File 1', type: 'file', size: 12345, date: '2023-01-01T00:00:00Z' },
  { _id: '2', name: 'Test File 2', type: 'file', size: 12346, date: '2023-01-02T00:00:00Z' },
  { _id: '3', name: 'Test Directory', type: 'dir', size: 0, date: '2023-01-03T00:00:00Z' }
];

let store;

beforeEach(() => {
  store = mockStore({
    files: {
      currentDir: 'root',
      files,
      dirStack: []
    },
    app: {
      view: 'list',
      loader: false
    }
  });
  store.dispatch = jest.fn();
});

const renderComponent = () => render(
  <Provider store={store}>
    <FileList />
  </Provider>
);

test('renders FileList without crashing', () => {
  renderComponent();
  expect(screen.getByText('Test File 1')).toBeInTheDocument();
  expect(screen.getByText('Test File 2')).toBeInTheDocument();
  expect(screen.getByText('Test Directory')).toBeInTheDocument();
});

test('back button works correctly', () => {
  store = mockStore({
    files: {
      currentDir: '2',
      files,
      dirStack: ['root']
    },
    app: {
      view: 'list',
      loader: false
    }
  });
  store.dispatch = jest.fn();
  
  renderComponent();
  const backButton = screen.getByTestId('backBtn');
  fireEvent.click(backButton);
  expect(store.dispatch).toHaveBeenCalledWith(popFromStack('2'));
  expect(store.dispatch).toHaveBeenCalledWith(setCurrentDir('root'));
});

test('loader is displayed correctly', () => {
  store = mockStore({
    files: {
      currentDir: 'root',
      files,
      dirStack: []
    },
    app: {
      view: 'list',
      loader: true
    }
  });
  
  renderComponent();
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

test('files are sorted by name', () => {
  renderComponent();
  const fileElements = screen.getAllByText(/Test File|Test Directory/);
  expect(fileElements[0]).toHaveTextContent('Test Directory');
  expect(fileElements[1]).toHaveTextContent('Test File 1');
  expect(fileElements[2]).toHaveTextContent('Test File 2');
});

test('empty message is displayed when no files are present', () => {
  store = mockStore({
    files: {
      currentDir: 'root',
      files: [],
      dirStack: []
    },
    app: {
      view: 'list',
      loader: false
    }
  });

  renderComponent();
  expect(screen.getByText('Files not found')).toBeInTheDocument();
});
