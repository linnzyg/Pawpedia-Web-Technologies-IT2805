import { useEffect, useState, useRef, useCallback } from 'react';
import { DogBreed } from '../../types/DogBreed';
import { getFavorites } from '../../utils/favoritesUtils';
import '../../style/FavoritesGrid.css';
import BreedCard from '../Global/BreedCard';
import { Link } from 'react-router-dom';

/*
Defines a subset of properties from the DogBreed type that are relevant for the favorites grid
Only includes id, name, image, and averageRating properties
*/
type FavoriteBreed = Pick<DogBreed, 'id' | 'name' | 'image' | 'averageRating'>;

/*
The FavoritesGrid component displays a user's favorite dog breeds with lazy loading
It retrieves the favorites from local storage and dynamically loads more breeds as the user scrolls
*/

function FavoritesGrid() {
  const [allDogs, setAllDogs] = useState<FavoriteBreed[]>([]);
  const [visibleDogs, setVisibleDogs] = useState<FavoriteBreed[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  // Fetch all favorite breeds from local storage on component mount
  useEffect(() => {
    const storedFavorites = getFavorites();
    setAllDogs(storedFavorites);
    setVisibleDogs(storedFavorites.slice(0, 8));
  }, []);

  // Function to load more items when the bottom of the grid is reached
  const loadMoreItems = useCallback(() => {
    setTimeout(() => {
      const currentLength = visibleDogs.length;
      const nextDogs = allDogs.slice(currentLength, currentLength + 8);

      if (nextDogs.length > 0) {
        setVisibleDogs((prev) => [...prev, ...nextDogs]);
      } else {
        setHasNextPage(false);
      }
    }, 300); // Simulated delay for loading animation
  }, [allDogs, visibleDogs]);

  // Sets up an IntersectionObserver to detect when the last item is visible
  useEffect(() => {
    if (!lastItemRef.current) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 },
    );

    if (lastItemRef.current) observer.current.observe(lastItemRef.current);

    return () => observer.current?.disconnect();
  }, [loadMoreItems]);

  return (
    <>
      <header className="favorites-header">
        <h2>Your favorite dogs:</h2>
      </header>

      <div className="dog-breed-gallery">
        {visibleDogs.length > 0 ? (
          visibleDogs.map((breed) => <BreedCard key={breed.id} breed={breed} />)
        ) : (
          <p>
            Looks like you haven't added any favorites yet.{' '}
            <Link to="/" aria-label="Start exploring breeds">
              Start exploring!
            </Link>
          </p>
        )}
        <div ref={lastItemRef} />
      </div>

      {!hasNextPage && (
        <p style={{ textAlign: 'center', margin: '20px 0' }}>
          You have looked at {visibleDogs.length} of {allDogs.length} breeds.
        </p>
      )}

      {hasNextPage && <p style={{ textAlign: 'center', margin: '20px 0' }}></p>}
    </>
  );
}

export { FavoritesGrid };
