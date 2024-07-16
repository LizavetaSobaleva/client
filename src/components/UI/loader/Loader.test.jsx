import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';

describe('Loader Component', () => {
  test('renders loader component', () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  test('renders loader line', () => {
    render(<Loader />);
    const loaderLineElement = screen.getByTestId('loaderLine');
    expect(loaderLineElement).toBeInTheDocument();
  });

  test('loader has correct class', () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toHaveClass('loader');
  });

  test('loader line has correct class', () => {
    render(<Loader />);
    const loaderLineElement = screen.getByTestId('loaderLine');
    expect(loaderLineElement).toHaveClass('loader__line');
  });
});
