import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Uploader from './Uploader';
import { hideUploader } from '../../../reducers/uploadReducer';


jest.mock('./UploadFile', () => ({ file }) => (
  <div data-testid={`file-${file.id}`}>{file.name}</div>
));

// Mocking Popup component
jest.mock('../../UI/popup/Popup', () => ({ header, onClick, children }) => (
  <div className='popup'>
    <div className="popup__header">
      <div className="popup__title" data-testid="popupTitle">{header}</div>
      <button onClick={onClick} data-testid="popupCloseBtn">Close</button>
    </div>
    <div>{children}</div>
  </div>
));

const mockStore = configureStore([]);

const files = [
  { id: '1', name: 'file1.txt', progress: 50 },
  { id: '2', name: 'file2.jpg', progress: 75 },
];

let store;

beforeEach(() => {
  store = mockStore({
    upload: {
      files,
      isVisible: true,
    },
  });
  store.dispatch = jest.fn();
});

const renderComponent = () => render(
  <Provider store={store}>
    <Uploader />
  </Provider>
);

test('renders Uploader without crashing', () => {
  renderComponent();
  expect(screen.getByTestId('popupTitle')).toHaveTextContent('Uploaded files');
  files.forEach(file => {
    expect(screen.getByTestId(`file-${file.id}`)).toBeInTheDocument();
  });
});

test('hides Uploader when close button is clicked', () => {
  renderComponent();
  fireEvent.click(screen.getByTestId('popupCloseBtn'));
  expect(store.dispatch).toHaveBeenCalledWith(hideUploader());
});

test('does not render Uploader when isVisible is false', () => {
  store = mockStore({
    upload: {
      files,
      isVisible: false,
    },
  });
  renderComponent();
  expect(screen.queryByTestId('popupTitle')).not.toBeInTheDocument();
});
