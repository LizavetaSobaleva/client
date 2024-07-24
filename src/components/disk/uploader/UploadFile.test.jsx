import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UploadFile from './UploadFile';
import { removeUploadFile } from '../../../reducers/uploadReducer';

jest.mock('../../UI/progressBar/ProgressBar', () => ({ progress }) => (
  <div data-testid="progressBar">{progress}%</div>
));

const mockStore = configureStore([]);

const file = {
  id: '1',
  name: 'file1.txt',
  progress: 50
};

let store;

beforeEach(() => {
  store = mockStore({});
  store.dispatch = jest.fn();
});

const renderComponent = () => render(
  <Provider store={store}>
    <UploadFile file={file} />
  </Provider>
);

test('renders UploadFile without crashing', () => {
  const { asFragment } = renderComponent();
  expect(screen.getByTestId('fileName')).toHaveTextContent('file1.txt');
  expect(screen.getByTestId('progressBar')).toHaveTextContent('50%');
  expect(asFragment()).toMatchSnapshot();
});

test('close button triggers removeUploadFile action', () => {
  const { asFragment } = renderComponent();
  fireEvent.click(screen.getByTestId('closeBtn'));
  expect(store.dispatch).toHaveBeenCalledWith(removeUploadFile('1'));
  expect(asFragment()).toMatchSnapshot();
});
