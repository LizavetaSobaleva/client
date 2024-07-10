import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UploadInput from './UploadInput';
import { uploadFile } from '../../../actions/file';

jest.mock('../../../actions/file', () => ({
  uploadFile: jest.fn((file, dir) => ({ type: 'UPLOAD_FILE', payload: { file, dir } })),
}));

const mockStore = configureStore([]);

const file = new File(['file contents'], 'example.txt', { type: 'text/plain' });

let store;

beforeEach(() => {
  store = mockStore({
    files: {
      currentDir: 'root',
    },
  });
  store.dispatch = jest.fn();
});

const renderComponent = () =>
  render(
    <Provider store={store}>
      <UploadInput />
    </Provider>
  );

test('renders UploadInput without crashing', () => {
  renderComponent();
  expect(screen.getByTestId('uploadArea')).toBeInTheDocument();
  expect(screen.getByTestId('uploadMessage')).toHaveTextContent('Click and choose or drag files to this area to upload');
});

test('calls fileUploadHandler on file input change', () => {
  renderComponent();
  const input = screen.getByLabelText(/upload/i);

  // Simulate file input change
  fireEvent.change(input, { target: { files: [file] } });
  expect(store.dispatch).toHaveBeenCalledWith(uploadFile(file, 'root'));
});

test('drag and drop functionality', () => {
  renderComponent();

  const dropArea = screen.getByTestId('uploadArea');

  // Simulate drag enter
  fireEvent.dragEnter(dropArea);
  expect(screen.getByTestId('uploadDropArea')).toBeInTheDocument();

  // Simulate drop
  fireEvent.drop(screen.getByTestId('uploadDropArea'), {
    dataTransfer: { files: [file] },
  });

  expect(store.dispatch).toHaveBeenCalledWith(uploadFile(file, 'root'));
});
