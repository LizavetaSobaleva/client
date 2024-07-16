import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popup from './Popup';

describe('Popup Component', () => {
  const mockOnClick = jest.fn();
  const headerText = 'Test Header';
  const childrenContent = <div>Test Content</div>;

  beforeEach(() => {
    mockOnClick.mockClear();
    render(<Popup header={headerText} onClick={mockOnClick}>{childrenContent}</Popup>);
  });

  test('renders popup component', () => {
    const popupElement = screen.getByTestId('popup');
    expect(popupElement).toBeInTheDocument();
  });

  test('renders header text', () => {
    const headerElement = screen.getByTestId('popupTitle');
    expect(headerElement).toHaveTextContent(headerText);
  });

  test('renders children content', () => {
    const childrenElement = screen.getByText('Test Content');
    expect(childrenElement).toBeInTheDocument();
  });

  test('renders close button with icon', () => {
    const closeButton = screen.getByTestId('popupCloseBtn');
    expect(closeButton).toBeInTheDocument();
    
    const closeIcon = screen.getByTestId('popupCloseIcon');
    expect(closeIcon).toBeInTheDocument();
  });

  test('close button triggers onClick', () => {
    const closeButton = screen.getByTestId('popupCloseBtn');
    fireEvent.click(closeButton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('clicking inside the popup does not trigger onClick', () => {
    const popupElement = screen.getByTestId('popup');
    fireEvent.click(popupElement);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
