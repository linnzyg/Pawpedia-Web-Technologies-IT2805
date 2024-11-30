import { describe, it, expect, vi } from 'vitest';
import { getRandomBreedId } from '../utils/randomBreedFetcher';
import { mockDogBreeds } from '../data/mockDogBreeds';

describe('getRandomBreedId', () => {
  it('should generate consistent snapshots of random breed IDs', () => {
    const edges = mockDogBreeds.map((breed) => ({ node: { id: breed.id } }));

    vi.spyOn(Math, 'random').mockReturnValueOnce(0.2).mockReturnValueOnce(0.8);

    const result1 = getRandomBreedId(edges);
    const result2 = getRandomBreedId(edges);

    expect(result1).toMatchSnapshot('random-breed-id-1');

    expect(result2).toMatchSnapshot('random-breed-id-2');

    vi.restoreAllMocks();
  });
});
