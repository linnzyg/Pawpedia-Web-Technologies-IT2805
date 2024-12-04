import React from 'react';
import '../style/AboutUs.css';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

function AboutUs() {
  return (
    <section id="aboutBody">
      <header>
        <h1>Welcome to Pawpedia, a dog breed database!</h1>
      </header>

      <Box className="content">
        <Card className="aboutBox">
          <h2 className="aboutTitle">About Us</h2>
          <Box className="aboutText">
            <p>
              Welcome to Pawpedia, your ultimate destination for exploring, learning about, and discovering the
              perfect dog breed that matches your lifestyle and preferences.
              <br />
              At Pawpedia, we believe that finding the right dog breed goes beyond appearance. It’s about personality,
              compatibility, and building a lasting bond.
              <br />
              Our passion for dogs inspired us to create a platform that caters to every kind of dog lover. Whether
              you’re a first-time dog owner or an experienced dog parent, our goal is to empower you with reliable,
              detailed insights.
            </p>
          </Box>
        </Card>
        <Card className="offerBox">
          <h2 className="aboutTitle">What We Offer</h2>
          <Box className="offerText">
            <Box>
              <h2>Breed Profiles</h2>
              <p>
                Our extensive database includes detailed information on various dog breeds—from physical
                characteristics and personality traits to health needs and grooming requirements.
              </p>
            </Box>
            <Box>
              <h2>Easy Filtering:</h2>
              <p>
                Find a breed that fits your lifestyle with advanced filtering tools that allow sorting by size, name and userratings!
              </p>
            </Box>
            <Box>
              <h2>Favorites and Discover:</h2>
              <p>
                Save and revisit breeds you love, and try our “Try Your Luck” button to discover random breeds.
              </p>
            </Box>
          </Box>
        </Card>
        <p>
          <Link to="/" className="viewAllBreedsLink">
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
          <strong>Email:</strong> <a href="mailto:info@pawpedia.com">info@pawpedia.com</a>
        </p>
        <p>We’d love to hear from you!</p>
      </footer>
    </section>
  );
}

export default AboutUs;
