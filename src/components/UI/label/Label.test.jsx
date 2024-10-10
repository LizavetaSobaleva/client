import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Label from './Label';

describe('Label Component', () => {
  test('renders label element', () => {
    render(<Label>Test Label</Label>);
    const labelElement = screen.getByTestId('label');
    expect(labelElement).toBeInTheDocument();
  });

  test('displays children correctly', () => {
    render(<Label>Test Label</Label>);
    const labelElement = screen.getByTestId('label');
    expect(labelElement).toHaveTextContent('Test Label');
  });

  test('applies status class correctly', () => {
    render(<Label status="admin">Admin Label</Label>);
    const labelElement = screen.getByTestId('label');
    expect(labelElement).toHaveClass('label admin');
  });

  test('accepts additional props', () => {
    render(<Label data-testid="customLabel" status="premium">Premium Label</Label>);
    const labelElement = screen.getByTestId('customLabel');
    expect(labelElement).toHaveTextContent('Premium Label');
    expect(labelElement).toHaveClass('label premium');
  });
});