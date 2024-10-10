import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Selector from './Selector';

describe('Selector Component', () => {
  const options = [
    { value: 'standard', label: 'standard' },
    { value: 'premium', label: 'premium' },
    { value: 'admin', label: 'admin' },
  ];

  test('renders selector element', () => {
    render(<Selector options={options} value="standard" onChange={() => {}} />);
    const selectorElement = screen.getByTestId('selector-trigger');
    expect(selectorElement).toBeInTheDocument();
    expect(selectorElement).toHaveTextContent('standard');
  });

  test('toggles options when trigger is clicked', () => {
    render(<Selector options={options} value="standard" onChange={() => {}} />);
    const triggerElement = screen.getByTestId('selector-trigger');

    // Open the dropdown
    fireEvent.click(triggerElement);
    expect(screen.getByTestId('selector-options')).toBeInTheDocument();
    expect(screen.getByText('premium')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();

    // Close the dropdown
    fireEvent.click(triggerElement);
    expect(screen.queryByTestId('selector-options')).not.toBeInTheDocument();
  });

  test('calls onChange handler when option is clicked', () => {
    const handleChange = jest.fn();
    render(<Selector options={options} value="standard" onChange={handleChange} />);
    const triggerElement = screen.getByTestId('selector-trigger');

    // Open the dropdown
    fireEvent.click(triggerElement);
    
    // Click on "Premium"
    fireEvent.click(screen.getByTestId('selector-option-premium'));
    expect(handleChange).toHaveBeenCalledWith('premium');
  });

  test('displays selected value when option is selected', () => {
    render(<Selector options={options} value="premium" onChange={() => {}} />);
    const selectorElement = screen.getByTestId('selector-trigger');
    expect(selectorElement).toHaveTextContent('premium');
  });
});