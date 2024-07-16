import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Component', () => {
  test('renders input element', () => {
    render(<Input />);
    const inputElement = screen.getByTestId('testInput');
    expect(inputElement).toBeInTheDocument();
  });

  test('accepts and displays initial value', () => {
    render(<Input value="initial value" />);
    const inputElement = screen.getByTestId('testInput');
    expect(inputElement).toHaveValue('initial value');
  });

  test('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByTestId('testInput');
    
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('accepts additional props', () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByTestId('testInput');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter text');
  });
});
