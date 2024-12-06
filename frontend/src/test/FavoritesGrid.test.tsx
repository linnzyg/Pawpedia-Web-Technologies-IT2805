import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FavoritesGrid } from '../components/FavoritesGrid/FavoritesGrid';
import { BrowserRouter as Router } from 'react-router-dom';

vi.mock('../utils/favoritesUtils', () => ({
  getFavorites: vi.fn(() => [
    { id: '1', name: 'Golden Retriever', image: 'golden-retriever.jpg', averageRating: 4.5 },
    { id: '2', name: 'Labrador', image: 'labrador.jpg', averageRating: 4.2 },
    { id: '3', name: 'Poodle', image: 'poodle.jpg', averageRating: 4.7 },
    { id: '4', name: 'Bulldog', image: 'bulldog.jpg', averageRating: 4.1 },
    { id: '5', name: 'Beagle', image: 'beagle.jpg', averageRating: 4.0 },
    { id: '6', name: 'German Shepherd', image: 'german-shepherd.jpg', averageRating: 4.3 },
    { id: '7', name: 'Dachshund', image: 'dachshund.jpg', averageRating: 4.6 },
    { id: '8', name: 'Rottweiler', image: 'rottweiler.jpg', averageRating: 4.4 },
    { id: '9', name: 'Boxer', image: 'boxer.jpg', averageRating: 4.2 },
  ]),
}));

// Mock IntersectionObserver with required properties
global.IntersectionObserver = class IntersectionObserver {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function;
  options: IntersectionObserverInit | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  constructor(callback: Function, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }

  observe() {
    // Simulate the intersection callback being triggered
    this.callback([{ isIntersecting: true }]);
  }

  disconnect() {}

  root = null;
  rootMargin = '0px';
  thresholds = [0];
  takeRecords() {
    return [];
  }
  unobserve() {}
};

describe('FavoritesGrid Component', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Router>
        <FavoritesGrid />
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
