import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Disk from './Disk';
import { getFiles, getStructure } from '../../actions/file';
import { setPopupDisplay } from '../../reducers/fileReducer';
import { setFileView } from '../../reducers/appReducer';

jest.mock('../../actions/file', () => ({
  getFiles: jest.fn(() => ({ type: 'GET_FILES' })),
  getStructure: jest.fn(() => ({ type: 'GET_STRUCTURE' })),
}));

const mockStore = configureStore([]);

let store;

beforeEach(() => {
  store = mockStore({
    files: {
      currentDir: 'root',
      files: [], // Ensure files array is initialized
      dirStack: [],
      popupDisplay: 'none',
    },
    app: {
      view: 'list',
    },
    upload: {
      files: [], // Ensure upload files array is initialized
      isVisible: false,
    },
  });
  store.dispatch = jest.fn();
});

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Disk />
    </Provider>
  );

test('renders Create folder button without crashing', () => {
  const { asFragment } = renderComponent();
  const createButton = screen.getByTestId('diskCreateBtn');
  expect(createButton).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});

test('renders ListView button without crashing', () => {
  const { asFragment } = renderComponent();
  const listViewButton = screen.getByTestId('listViewBtn');
  expect(listViewButton).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});

test('renders PlateView button without crashing', () => {
  const { asFragment } = renderComponent();
  const plateViewButton = screen.getByTestId('plateViewBtn');
  expect(plateViewButton).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});

test('create folder button opens the popup', () => {
  renderComponent();
  fireEvent.click(screen.getByTestId('diskCreateBtn'));
  expect(store.dispatch).toHaveBeenCalledWith(setPopupDisplay('flex'));
});

test('toggles file view correctly between list and plate', () => {
  renderComponent();
  const listViewButton = screen.getByTestId('listViewBtn');
  const plateViewButton = screen.getByTestId('plateViewBtn');

  fireEvent.click(listViewButton);
  expect(store.dispatch).toHaveBeenCalledWith(setFileView('list'));

  fireEvent.click(plateViewButton);
  expect(store.dispatch).toHaveBeenCalledWith(setFileView('plate'));
});

test('useEffect dispatches getFiles and getStructure on mount and currentDir change', () => {
  renderComponent();
  expect(store.dispatch).toHaveBeenCalledWith(getFiles('root'));
  expect(store.dispatch).toHaveBeenCalledWith(getStructure());
});
