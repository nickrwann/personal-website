import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom'; // This import is for using the jest-dom matchers

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('applies dark mode based on state', () => {
    render(<App />);
    expect(screen.getByRole('main').parentNode).toHaveClass('dark-mode');
  });

  test('renders child components', () => {
    render(<App />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('profile-pic')).toBeInTheDocument();
    expect(screen.getByTestId('summary')).toBeInTheDocument();
    expect(screen.getByTestId('experience')).toBeInTheDocument();
  });

  // test('fails this test on purpose', () => {
  //   const expectedText = "This text does not exist";
  //   render(<App />);
  //   expect(screen.getByText(expectedText)).toBeInTheDocument();
  // });
});
