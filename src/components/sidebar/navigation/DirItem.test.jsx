import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DirItem from './DirItem';
import { pushToStack, setCurrentDir, clearStack } from '../../../reducers/fileReducer';

const mockStore = configureStore([]);
let store;

const file = {
  _id: '1',
  name: 'Root',
  idPath: ['1'],
  childs: [
    {
      _id: '2',
      name: 'Child 1',
      idPath: ['1', '2'],
      childs: []
    },
    {
      _id: '3',
      name: 'Child 2',
      idPath: ['1', '3'],
      childs: []
    }
  ]
};

const renderComponent = (store) =>
  render(
    <Provider store={store}>
      <DirItem file={file} title={file.name} />
    </Provider>
  );

describe('DirItem Component', () => {
  beforeEach(() => {
    store = mockStore({
      files: { currentDir: 'root' }
    });
    store.dispatch = jest.fn();
  });

  test('renders DirItem without crashing', () => {
    const { asFragment } = renderComponent(store);
    expect(screen.getByTestId('dirItem-1')).toBeInTheDocument();
    expect(screen.getByTestId('dirItemTitle-1')).toHaveTextContent('Root');
    expect(asFragment()).toMatchSnapshot();
  });

  test('calls openHandler when title is clicked', () => {
    renderComponent(store);
    fireEvent.click(screen.getByTestId('dirItemTitle-1'));
    expect(store.dispatch).toHaveBeenCalledWith(clearStack());
    expect(store.dispatch).toHaveBeenCalledWith(pushToStack([]));
    expect(store.dispatch).toHaveBeenCalledWith(setCurrentDir('1'));
  });

  test('renders dropdown button if there are children', () => {
    const { asFragment } = renderComponent(store);
    expect(screen.getByTestId('dirItemDropdown-1')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('toggles subitems visibility when dropdown button is clicked', () => {
    renderComponent(store);
    const subItem = screen.getByTestId('dirItemSubItem-1');
    expect(subItem).not.toHaveClass('visible');
    fireEvent.click(screen.getByTestId('dirItemDropdown-1'));
    expect(subItem).toHaveClass('visible');
  });
});
