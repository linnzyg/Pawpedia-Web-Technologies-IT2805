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
import { styled } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import { toggleFavorite, isFavorite } from '../utils/favoritesUtils';

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

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#7e8a58',
  },
});

const DogBreedDetail: React.FC<DogBreedDetailProps> = ({ breed, id }) => {
  const [favorite, setFavorite] = useState(false);
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_BREED, variables: { id: id } }],
    onError: (error) => {
      console.error('Error adding comment:', error);
    },
  });

  //La til rating der vi handler kommentarer
  const handleAddComment = (username: string, comment: string, rating: number) => {
    addComment({
      variables: {
        comment: {
          breedId: id,
          username,
          comment,
          rating,
        },
      },
    });
  };

  const [tableValue, setTableValue] = React.useState('1');

  const handleChange = (_event: React.SyntheticEvent, newTableValue: string) => {
    setTableValue(newTableValue);
  };

  useEffect(() => {
    setFavorite(isFavorite(id));
  }, [id]);

  const handleFavoriteClicked = () => {
    const newState = toggleFavorite(id, {
      id,
      name: breed.name,
      image: breed.image,
      averageRating: breed.averageRating,
    });
    setFavorite(newState);
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
            <Box>
              <h1>{breed.name}</h1>
              <button onClick={handleFavoriteClicked} id="favorite-btn" aria-label="favorite-button">
                {favorite ? (
                  <FavoriteIcon id="heartIcon" style={{ color: '#b19acc' }} aria-label="Favorite" />
                ) : (
                  <FavoriteBorderIcon id="heartIcon" aria-label="Not Favorite" />
                )}
              </button>
            </Box>
            <p>
              {breed?.averageRating ? (
                <Rating readOnly value={Number(breed.averageRating.toFixed(1))} precision={0.1} />
              ) : (
                'No ratings yet'
              )}
            </p>
          </header>
          <Box className="infoTabs">
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
                <Box className="visualStats">
                  <Box>
                    <p>Trainability: </p>
                    <StyledRating
                      icon={<CircleIcon />}
                      emptyIcon={<CircleOutlinedIcon />}
                      name="read-only"
                      value={breed.trainability}
                      readOnly
                    />
                  </Box>
                  <Box>
                    <p>Friendliness:</p>
                    <StyledRating
                      icon={<CircleIcon />}
                      emptyIcon={<CircleOutlinedIcon />}
                      name="read-only"
                      value={breed.friendliness}
                      readOnly
                    />
                  </Box>
                  <Box>
                    <p>Allergy friendliness: </p>
                    <StyledRating
                      icon={<CircleIcon />}
                      emptyIcon={<CircleOutlinedIcon />}
                      name="read-only"
                      value={breed.allergy}
                      readOnly
                    />
                  </Box>
                  <Box>
                    <p>Energy level:</p>
                    <StyledRating
                      icon={<CircleIcon />}
                      emptyIcon={<CircleOutlinedIcon />}
                      name="read-only"
                      value={breed.energy}
                      readOnly
                    />
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <Box className="healthBox">
                  <p>
                    <MonitorHeartIcon /> Average lifespan: {breed.lifespan} years
                  </p>
                  <p>
                    <ScaleIcon /> Average weight: {breed.weight} kg
                  </p>
                  <p>
                    <HeightIcon /> Average height: {breed.height} cm
                  </p>
                  <p>
                    <LocalHospitalIcon /> Typical issues: {breed.issues}
                  </p>
                </Box>
              </TabPanel>
            </TabContext>
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
              {(
                [...(breed.comments ?? [])].sort(
                  (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
                ) ?? []
              ).map((comment: { username: string; comment: string; rating?: number; timestamp: string }, index) => (
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
                  <Box className="commentName">
                    {comment.rating === null || comment.rating === undefined ? (
                      comment.username
                    ) : (
                      <>
                        <p>{comment.username}</p>
                        <Rating readOnly value={comment.rating} />
                      </>
                    )}
                  </Box>
                  <p style={{ fontStyle: 'italic' }}>
                    {new Date(comment.timestamp).toLocaleString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="commentText">{comment.comment}</p>
                </Box>
              ))}
            </>
          ) : (
            <p className="noComments">No comments yet. Be the first to comment!</p>
          )}
        </section>
      </section>
    </>
  );
};

export default DogBreedDetail;
