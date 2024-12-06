import { render } from '@testing-library/react';
import Search from '../components/Search';

describe('Search Component Snapshot', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Search searchByName="Golden Retriever" onSearchChange={() => {}} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
