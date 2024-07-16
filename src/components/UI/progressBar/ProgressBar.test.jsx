import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from './ProgressBar';

describe('ProgressBar Component', () => {
  const renderComponent = (progress) => render(<ProgressBar progress={progress} />);

  test('renders progress bar with correct width and percentage', () => {
    const progress = 50;
    renderComponent(progress);
    const progressBarUpload = screen.getByTestId('progressBarUpload');
    const progressBarPercent = screen.getByTestId('progressBarPercent');
    
    expect(progressBarUpload).toHaveStyle(`width: ${progress}%`);
    expect(progressBarPercent).toHaveTextContent(`${progress}%`);
  });

  test('renders progress bar with green color when progress is 100%', () => {
    const progress = 100;
    renderComponent(progress);
    const progressBarUpload = screen.getByTestId('progressBarUpload');
    
    expect(progressBarUpload).toHaveStyle('background-color: green');
  });

  test('renders progress bar without green color when progress is less than 100%', () => {
    const progress = 50;
    renderComponent(progress);
    const progressBarUpload = screen.getByTestId('progressBarUpload');
    
    expect(progressBarUpload).not.toHaveStyle('background-color: green');
  });

  test('renders correct margin for percentage text', () => {
    const progress = 75;
    renderComponent(progress);
    const progressBarPercent = screen.getByTestId('progressBarPercent');
    
    expect(progressBarPercent).toHaveStyle(`margin-right: ${100 - progress}%`);
  });

  test('displays the correct progress percentage', () => {
    const progress = 25;
    renderComponent(progress);
    const progressBarPercent = screen.getByTestId('progressBarPercent');
    
    expect(progressBarPercent).toBeInTheDocument();
    expect(progressBarPercent).toHaveTextContent(`${progress}%`);
  });
});
