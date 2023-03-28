import { render, screen } from '@testing-library/react';
import Banner from './Banner';
import { MemoryRouter } from 'react-router-dom';




describe('Banner component', () => {
  beforeEach(() => {
    render(<Banner />, {wrapper: MemoryRouter});
  });

  it('renders the banner component', () => {
    const bannerElement = screen.getByTestId('banner');
    expect(bannerElement).toBeInTheDocument();
  });

  it('has correct alt text for the image', () => {
    const imageElement = screen.getByAltText('XX99 Mark 2 Headphones');
    expect(imageElement).toBeInTheDocument();
  });

  it('renders the Button component with correct props', () => {
    const buttonElement = screen.getByRole('link', { name: 'See Product' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('href', '/category/headphones/product-details/xx99-mark-two-headphones');
  });
});