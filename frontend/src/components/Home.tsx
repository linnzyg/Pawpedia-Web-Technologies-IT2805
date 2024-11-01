import React from 'react';
import '../style/Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section id="homeBody">
        <header>
          <h1>Welcome to Pawpedia, a dog breed database!</h1>
        </header>

        <section className="aboutUs">
          <h2>About Us</h2>
          <p>
            Welcome to Pawpedia, your ultimate destination for exploring, learning about, and discovering the perfect
            dog breed that matches your lifestyle and preferences.
          </p>
          <p>
            At Pawpedia, we believe that finding the right dog breed goes beyond appearance. It’s about personality,
            compatibility, and building a lasting bond. Our app is designed to help dog enthusiasts, potential adopters,
            and curious learners connect with a variety of breeds in a way that’s engaging, informative, and fun.
          </p>
          <h3>Why We Created Pawpedia</h3>
          <p>
            Our passion for dogs inspired us to create a platform that caters to every kind of dog lover. Whether you’re
            a first-time dog owner looking for a low-maintenance companion or an experienced dog parent eager to explore
            new breeds, our goal is to empower you with reliable, detailed insights that help you make an informed
            choice.
          </p>
          <h3>What We Offer</h3>
          <ul>
            <li>
              <strong>Breed Profiles:</strong> <br></br>Our extensive database includes detailed information on various
              dog breeds—from physical characteristics and personality traits to health needs and grooming requirements.
            </li>
            <li>
              <strong>Easy Filtering:</strong> <br></br>Find a breed that fits your lifestyle with advanced filtering
              tools that allow sorting by size, temperament, energy level, and more.
            </li>
            <li>
              <strong>Favorites and Discover:</strong> <br></br> Save and revisit breeds you love, and try our “Try Your
              Luck” button to discover random breeds you might not have considered.
            </li>
          </ul>
          <h3>Our Vision</h3>
          <p>
            At Pawpedia, we’re committed to building a community of informed and responsible dog owners. We aim to
            foster connections between people and the dogs that will bring them joy, companionship, and loyalty. With
            every breed explored, every dog found, and every life enriched, we’re reminded of why we started this
            journey—to make it easier for people and pets to find each other.
          </p>
          <p>
            Whether you’re here to find a new friend or simply to learn more about the world’s diverse dog breeds, we’re
            thrilled to have you with us. Dive in, explore, and let us help you find the perfect dog breed that suits
            your unique personality and lifestyle.
          </p>
          <p>
            <Link to="/" className="viewAllBreedsLink">
              See all our breeds &rarr;
            </Link>
          </p>
        </section>

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
