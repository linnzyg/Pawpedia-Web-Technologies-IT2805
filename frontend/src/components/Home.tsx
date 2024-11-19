import React from 'react';
import '../style/Home.css';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

/**
 * Home Component
 * - Displays an introduction and information about the Pawpedia platform.
 * - Provides a welcoming and informative experience for first-time visitors.
 */

function Home() {
  return (
    <>
      <section id="homeBody">
        <header>
          <h1>Welcome to Pawpedia, a dog breed database!</h1>
        </header>

        <Box className="content">
          <Card className="aboutBox">
            <h2 className="homeTitle">About Us</h2>
            <Box className="aboutText">
              <p>
                Welcome to Pawpedia, your ultimate destination for exploring, learning about, and discovering the
                perfect dog breed that matches your lifestyle and preferences.
              </p>
              <p>
                At Pawpedia, we believe that finding the right dog breed goes beyond appearance. It’s about personality,
                compatibility, and building a lasting bond. Our app is designed to help dog enthusiasts, potential
                adopters, and curious learners connect with a variety of breeds in a way that’s engaging, informative,
                and fun.
              </p>
              <h3>Why We Created Pawpedia </h3>
              <p>
                Our passion for dogs inspired us to create a platform that caters to every kind of dog lover. Whether
                you’re a first-time dog owner looking for a low-maintenance companion or an experienced dog parent eager
                to explore new breeds, our goal is to empower you with reliable, detailed insights that help you make an
                informed choice.
              </p>
            </Box>
          </Card>
          <Card className="offerBox">
            <h2 className="homeTitle">What We Offer</h2>
            <Box className="offerText">
              <Box>
                <p className="profileTitle">Breed Profiles:</p>
                <p id="hide-1">
                  Our extensive database includes detailed information on various dog breeds—from physical
                  characteristics and personality traits to health needs and grooming requirements.
                </p>
              </Box>

              <Box>
                <p className="profileTitle">Easy Filtering:</p>
                <p id="hide-2">
                  Find a breed that fits your lifestyle with advanced filtering tools that allow sorting by size,
                  temperament, energy level, and more.
                </p>
              </Box>
              <Box>
                <p className="profileTitle">Favorites and Discover:</p>
                <p id="hide-3">
                  Save and revisit breeds you love, and try our “Try Your Luck” button to discover random breeds you
                  might not have considered.
                </p>
              </Box>
            </Box>
          </Card>
          <p>
            <Link
              to="/"
              className="viewAllBreedsLink"
              style={{
                borderColor: (theme: { palette: { mode: string } }) =>
                  theme.palette.mode === 'dark' ? '#424242' : '#ffffff',
              }}
            >
              See all our breeds &rarr;
            </Link>
          </p>
        </Box>

        <footer>
          <h3>Contact us</h3>
          <p>
            <strong>Phone:</strong> 98765432
          </p>
          <p>
            <strong>Email:</strong> <a>info@pawpedia.com</a>
          </p>
          <p>We’d love to hear from you!</p>
        </footer>
      </section>
    </>
  );
}

export default Home;
