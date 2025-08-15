import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  it('renders the title correctly', () => {
    render(<Header />);
    const titleElement = screen.getByText('.COD_WARS');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the deposit button', () => {
    render(<Header />);
    const buttonElement = screen.getByRole('button', { name: /deposit/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls handleClick when deposit button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Header />);
    const buttonElement = screen.getByRole('button', { name: /deposit/i });
    
    fireEvent.click(buttonElement);
    
    expect(consoleSpy).toHaveBeenCalledWith('the deposit button has been clicked');
    consoleSpy.mockRestore();
  });
});
