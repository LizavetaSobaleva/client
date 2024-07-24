import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import File from './File';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { deleteFile, downloadFile } from '../../../../actions/file';


jest.mock('axios');

jest.mock('../../../../actions/file', () => ({
  downloadFile: jest.fn().mockReturnValue({ type: 'DOWNLOAD_FILE' }),
  deleteFile: jest.fn().mockReturnValue({ type: 'DELETE_FILE' })
}));

const mockStore = configureStore([]);

const file = {
  _id: '1',
  name: 'Test File',
  type: 'file',
  size: 12345,
  date: '2023-01-01T00:00:00Z'
};

const dir = {
  _id: '2',
  name: 'Test Directory',
  type: 'dir',
  date: '2023-01-01T00:00:00Z'
};

let store;

beforeEach(() => {
  store = mockStore({
    files: { currentDir: 'root' },
    app: { view: 'list' },
  });
  store.dispatch = jest.fn();
});

const renderComponent = (file) =>
  render(
    <Provider store={store}>
      <File file={file} />
    </Provider>
  );

test('renders file without crashing', () => {
  const { asFragment } = renderComponent(file);
  const fileName = screen.getByTestId('fileName')
  expect(fileName).toHaveTextContent('Test File')
  expect(asFragment()).toMatchSnapshot();
});

test('renders file date without crashing', () => {
  const { asFragment } = renderComponent(file);
  const fileDate = screen.getByTestId('fileDate')
  expect(fileDate).toHaveTextContent('2023-01-01')
  expect(asFragment()).toMatchSnapshot();
});

test('renders file size without crashing', () => {
  const { asFragment } = renderComponent(file);
  const fileSize = screen.getByTestId('fileSize')
  expect(fileSize).toHaveTextContent('12.1 Kb')
  expect(asFragment()).toMatchSnapshot();
});

test('renders directory without crashing', () => {
  const { asFragment } = renderComponent(dir);
  const fileName = screen.getByTestId('fileName')
  expect(fileName).toHaveTextContent('Test Directory')
  expect(asFragment()).toMatchSnapshot();
});

test('openHandler dispatches correct actions for directory', () => {
  const { asFragment } = renderComponent(dir);
  fireEvent.click(screen.getByText('Test Directory'));
  expect(store.dispatch).toHaveBeenCalledWith(pushToStack('root'));
  expect(store.dispatch).toHaveBeenCalledWith(setCurrentDir('2'));
  expect(asFragment()).toMatchSnapshot();
});

test('downloadClickHandler triggers downloadFile action', () => {
  const { asFragment } = renderComponent(file);
  fireEvent.click(screen.getByText('Download'));
  expect(downloadFile).toHaveBeenCalledWith(file);
  expect(asFragment()).toMatchSnapshot();
});


test('deleteClickHandler triggers deleteFile action', () => {
  const { asFragment } = renderComponent(file);
  fireEvent.click(screen.getByText('Delete'));
  expect(store.dispatch).toHaveBeenCalledWith(deleteFile(file));
  expect(asFragment()).toMatchSnapshot();
});



