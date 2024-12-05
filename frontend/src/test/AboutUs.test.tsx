import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutUs from '../components/AboutUs';

// Snapshot test for AboutUs component
test('AboutUs component renders correctly and matches snapshot', () => {
  const { container } = render(
    <MemoryRouter>
      <AboutUs />
    </MemoryRouter>,
  );

  expect(container).toMatchSnapshot();
});
