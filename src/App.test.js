import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // The App component might be wrapped in an ErrorBoundary and Suspense
    // We check for some root content
    expect(screen.getByText(/Aditya/i)).toBeInTheDocument();
  });

  test('displays landing page content', () => {
    render(<App />);
    expect(screen.getByText(/Aditya/i)).toBeInTheDocument();
  });

  test('has navigation buttons', () => {
    render(<App />);
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});
