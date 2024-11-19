import React, { useEffect, useState } from 'react';
import { DogBreed } from '../types/DogBreed';
import '../style/DogCard.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../style/DogBreedDetail.css';
import Commentary from './Comment';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../api/mutations';
import { GET_BREED } from '../api/queries';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import Rating from '@mui/material/Rating';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

/**
 * Props interface for the DogBreedDetail component.
 * - `breed`: The breed information that includes details like name, description, image, etc.
 * - `id`: The unique ID of the breed.
 */

interface DogBreedDetailProps {
  breed: DogBreed;
  id: string;
}

/**
 * DogBreedDetail Component
 * - Displays detailed information about a specific breed.
 * - Allows users to add comments to the breed.
 * - Uses GraphQL mutation to add comments to the backend.
 */


const DogBreedDetail: React.FC<DogBreedDetailProps> = ({ breed, id }) => {
  const [isFavorite, setIsFavorite] = useState(breed.favorite);
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_BREED, variables: { id: id } }],
    onError: (error) => {
      console.error('Error adding comment:', error);
    },
  });

  // Handle the addition of a new comment, using the `addComment` mutation
  const handleAddComment = (username: string, comment: string) => {
    addComment({
      variables: {
        comment: {
          breedId: id,
          username,
          comment,
        },
      },
    });
  };

  const [tableValue, setTableValue] = React.useState('1');

  const handleChange = (_event: React.SyntheticEvent, newTableValue: string) => {
    setTableValue(newTableValue);
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((fav: DogBreedDetailProps) => fav.id === id));
  }, [id]);

  const handleFavoriteClicked = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorite) {
      const newFavorites = favorites.filter((fav: { id: string }) => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      console.log('Removed from favorites:', newFavorites);
    } else {
      const newFavorite = { id, name: breed.name, image: breed.image };
      const updatedFavorites = [...favorites, newFavorite];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      console.log('Added to favorites:', newFavorite);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <Box
        className="dog-breed-detail"
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#211e1c' : '#ffffff'),
          color: (theme) => (theme.palette.mode === 'dark' ? '#ffffff' : '#000000'),
          padding: 2,
          boxShadow: 1,
        }}
      >
        <img src={`/images/${breed.image}`} alt={`Picture of our dog breed: ${breed.name}`} />
        <Box id="dogInfo">
          <header>
            <h1>{breed.name}</h1>
            <button onClick={handleFavoriteClicked} id="favorite-btn">
              {isFavorite ? (
                <FavoriteIcon id="heartIcon" style={{ color: '#b19acc' }} aria-label="Favorite" />
              ) : (
                <FavoriteBorderIcon id="heartIcon" aria-label="Not Favorite" />
              )}
            </button>
          </header>
          <Box>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={tableValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="Dog detail tabs">
                    <Tab label="Description" value="1" />
                    <Tab label="Personality stats" value="2" />
                    <Tab label="Health stats" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <p>{breed.description}</p>
                </TabPanel>
                <TabPanel value="2">
                  <Rating
                    icon={<CircleIcon/>}
                    emptyIcon={<CircleOutlinedIcon/>}
                    name="read-only"
                    value={3}
                    readOnly
                  />
                  <Rating
                    icon={<CircleIcon/>}
                    emptyIcon={<CircleOutlinedIcon/>}
                    name="read-only"
                    value={3}
                    readOnly
                  />
                  <Rating
                    icon={<CircleIcon/>}
                    emptyIcon={<CircleOutlinedIcon/>}
                    name="read-only"
                    value={3}
                    readOnly
                  />
                  <Rating
                    icon={<CircleIcon/>}
                    emptyIcon={<CircleOutlinedIcon/>}
                    name="read-only"
                    value={3}
                    readOnly
                  />
                </TabPanel>
                <TabPanel value="3">health</TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Box>
      </Box>
      <section className="comment-area mt-6">
        <Box>
          <Box
            id="commentHeader"
            sx={{
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#211e1c' : '#ffffff'),
              color: (theme) => (theme.palette.mode === 'dark' ? '#ffffff' : '#000000'),
              padding: 2,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <h2 className="text-xl">Leave a Comment on {breed.name}:</h2>
            <Commentary onAddComment={handleAddComment} breedId={breed.id} />
          </Box>
        </Box>
        <section className="commentSection">
          <h3 className="text-xl pb-5">Comments:</h3>
          {(breed.comments ?? []).length > 0 ? (
            <>
              {breed.comments.map((comment, index) => (
                <Box
                  key={index}
                  className="commentElement"
                  sx={{
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#211e1c' : '#ffffff'),
                    color: (theme) => (theme.palette.mode === 'dark' ? '#ffffff' : '#000000'),
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <p className="commentName">{comment.username}</p>
                  <p className="commentText">{comment.comment}</p>
                </Box>
              ))}
            </>
          ) : (
            <p className="mt-4 text-gray-600">No comments yet. Be the first to comment!</p>
          )}
        </section>
      </section>
    </>
  );
};

export default DogBreedDetail;
