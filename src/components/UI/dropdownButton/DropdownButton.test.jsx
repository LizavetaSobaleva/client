import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownButton from './DropdownButton';

describe('DropdownButton', () => {
  beforeEach(() => {
    render(<DropdownButton />);
  });

  test('renders icon button', () => {
    const icon = screen.getByTestId('dropdownIcon');
    expect(icon).toBeInTheDocument();
  });

  test('toggles icon class on click', () => {
    const icon = screen.getByTestId('dropdownIcon');
    const button = screen.getByTestId('dropdownButton');
    
    expect(icon).not.toHaveClass('flipped');

    // Click to add the 'flipped' class
    fireEvent.click(button);
    expect(icon).toHaveClass('flipped');

    // Click to remove the 'flipped' class
    fireEvent.click(button);
    expect(icon).not.toHaveClass('flipped');
  });
});
