import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SecondaryButton from './SecondaryButton';

describe('SecondaryButton Component', () => {
  const buttonText = 'Test Click';
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
    render(<SecondaryButton onClick={mockOnClick}>{buttonText}</SecondaryButton>);
  });

  test('renders button with correct text', () => {
    const buttonElement = screen.getByTestId('secondaryButton');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(buttonText);
  });

  test('button click triggers onClick handler', () => {
    const buttonElement = screen.getByTestId('secondaryButton');
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('button has correct class name', () => {
    const buttonElement = screen.getByTestId('secondaryButton');
    expect(buttonElement).toHaveClass('secondaryButton');
  });
});
