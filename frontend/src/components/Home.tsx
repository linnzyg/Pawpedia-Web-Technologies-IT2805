import React from 'react';
import '../style/Home.css';

function Home() {
  return (
    <>
      <section id="homeBody">
        <header>
          <h1>Welcome to Pawpedia, a dog breed database!</h1>
        </header>

        <section>
        <p>
          Pawpedia is an application designed to showcase various dog breeds. The first version uses static mocked data to display dog breeds in a gallery view. The gallery view can lead the user to the detailed view about each dog breed by pressing the pictures of the dogs.
        </p>
        <p>
          The coming versions of Pawpedia will contain a database running a backend meaning more data and dog breeds. Each breed will also have more details and information about the breed itself. Styling will also be done using third party libraries such as shadcn.
        </p>
        
        <p>Features:</p>
        <ul>
          <li>
            Gallery View: Browse all dog breeds in an easy-to-navigate gallery
          </li>
          <li>
            Detailed Breed View: Click on a breed to view more detailed information
          </li>
          <li>
            Sorting Options: Sort breeds alphabetically or by your favorites
          </li>
          <li>
            Filters: Filter breeds by size—small or large dogs
          </li>
          <li>
            Search: Quickly search for dog breeds by name
          </li>
        </ul>
        </section>

        <footer>Contact information: 98765432</footer>
      </section>
    </>
  );
}

export default Home;
