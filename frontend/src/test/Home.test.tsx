import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';

// Snapshot test for Home component
test('Home component renders correctly and matches snapshot', () => {
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();
});
