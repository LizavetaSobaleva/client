import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CreateDir from './CreateDir';
import { setPopupDisplay } from '../../reducers/fileReducer';
import { createDir } from '../../actions/file';

// Mocking Popup component
jest.mock('../UI/popup/Popup', () => ({ header, onClick, children }) => (
  <div className='popup' data-testid="popup">
    <div className="popup__header">
      <div className="popup__title" data-testid="popupTitle">{header}</div>
      <button onClick={onClick} data-testid="popupCloseBtn">Close</button>
    </div>
    <div>{children}</div>
  </div>
));


jest.mock('../../actions/file', () => ({
  createDir: jest.fn((currentDir, dirName) => ({ type: 'CREATE_DIR', payload: { currentDir, dirName } })),
}));

const mockStore = configureStore([]);

let store;

beforeEach(() => {
  store = mockStore({
    files: {
      popupDisplay: 'block',
      currentDir: 'root',
    },
  });
  store.dispatch = jest.fn();
});

const renderComponent = () => render(
  <Provider store={store}>
    <CreateDir />
  </Provider>
);

test('renders CreateDir without crashing', () => {
  renderComponent();
  expect(screen.getByTestId('popupTitle')).toHaveTextContent('Create new folder');
  expect(screen.getByPlaceholderText('Enter folder name...')).toBeInTheDocument();
});

test('closes popup when close button is clicked', () => {
  renderComponent();
  fireEvent.click(screen.getByTestId('popupCloseBtn'));
  expect(store.dispatch).toHaveBeenCalledWith(setPopupDisplay('none'));
});

test('calls createDir action with correct parameters when create button is clicked', () => {
  renderComponent();
  const input = screen.getByTestId('createInput');
  fireEvent.change(input, { target: { value: 'New Folder' } });
  fireEvent.click(screen.getByTestId('createBtn'));
  expect(store.dispatch).toHaveBeenCalledWith(createDir('root', 'New Folder'));
  expect(store.dispatch).toHaveBeenCalledWith(setPopupDisplay('none'));
});

test('closes popup when clicking outside content', () => {
  renderComponent();
  fireEvent.click(screen.getByTestId('testOutsideContent'));
  expect(store.dispatch).toHaveBeenCalledWith(setPopupDisplay('none'));
});
