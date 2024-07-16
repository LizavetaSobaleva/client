import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton Component', () => {
  const buttonText = 'Test Click';
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
    render(<PrimaryButton onClick={mockOnClick}>{buttonText}</PrimaryButton>);
  });

  test('renders button with correct text', () => {
    const buttonElement = screen.getByTestId('primaryButton');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(buttonText);
  });

  test('button click triggers onClick handler', () => {
    const buttonElement = screen.getByTestId('primaryButton');
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('button has correct class name', () => {
    const buttonElement = screen.getByTestId('primaryButton');
    expect(buttonElement).toHaveClass('primaryButton');
  });
});
