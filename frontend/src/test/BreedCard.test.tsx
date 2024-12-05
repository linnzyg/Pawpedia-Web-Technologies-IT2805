import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import BreedCard from '../components/BreedCard';

describe('BreedCard Component', () => {
  const mockBreed = {
    id: '1',
    name: 'Golden Retriever',
    averageRating: 4.5,
    image: 'golden-retriever.jpg',
  };

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Router>
        <BreedCard breed={mockBreed} />
      </Router>,
    );

    // Create a snapshot of the rendered component
    expect(asFragment()).toMatchSnapshot();
  });
});
