# Pawpedia

Pawpedia is an application designed to showcase various dog breeds. There is a gallery view displaying dog breeds fetched from a database. The gallery view can lead the user to the detailed view about each dog breed by pressing the pictures of the dogs, where you can also read and leave comments about the bread.

## Features
* Gallery View: Browse all dog breeds in an easy-to-navigate gallery
* Detailed Breed View: Click on a breed to view more detailed information. Add and read comments about the breed.
* Sorting Options: Sort breeds alphabetically, by average rating, trainability, friendliness and lifespan
* Filters: Filter breeds by size. Also statistical filters for allergy friendliness, allowed in Flight Cabin (Max 8 kg) and high energy level
* Search: Quickly search for dog breeds by name
* Favorites: Add dog breeds to favorites that gets stored in your browser

## How to run
### Prerequisites
Make sure you have Node.js 22.5+ and npm 10.8+ installed.

### Install dependencies:
Clone the project in your favorite IDE, navigate to the frontend folder, and then install dependencies using:
```bash
npm install
```

Navigate to the server folder, and then install dependencies using:
```bash
npm install
```

### Start the development server:
To run the frontend locally, use this command in the frontend folder:
```bash
npm run dev
```

To run the server locally, remember to connect to NTNU through VPN or be connected to the NTNU network, then use this command in the server folder:
```bash
npx ts-node src/index.ts
```

## Showcase
http://it2810-35.idi.ntnu.no/project2

## Documentation and choices
The choice of making a dog application was made due to dogs being cute, and motivated all four developers to work on this project with love.

### Static images
Our images are stored in a public folder as static files since there are no user features in the app that require uploading or downloading images. This makes it simple to manage images, as they’re uploaded only when needed. 

## Tech Stack
* React with TypeScript: Frontend framework - required for the task
* Apollo Client: For handling GraphQL queries and managing local/global app state. Chosen due to TS support, alongisde the efficient query handling.
* GraphQL: API query language used to fetch dog breed data from the server. Required for the task.
* MongoDB: Database for storing dog breed information. MongoDB is a document oriented structure, which is great for storing semi-structured data like features of a dog breed. It also scales, meaning the app can be extended without database troubles.
* STATE MANAGEMENT - The state is managed using Redux. The development team chose redux to store the entire application state in a single centralized store, making it easy to manage and debug.
* UI-libraries - Materials UI  was chosen for its great UI components on the frontend.

## Accessibility
Several considerations and actions have been taken to ensure the accessibility of this application.
All interactive elements can be reached and interacted with by using the keyboard. Unnecessary tabbing through elements with confusing screen reader descriptions are prevented by trying to use as many semantic HTML elements as possible.
Other actions taken are using htmlFor attribute to tie together labels and interactive elements. There is also added alt-text to all dog images.
Functional testing with screen reader on windows have been performed to confirm these cosiderations.

### WCAG
TODO

### Sustainable web design choices made - TO DO
* Darkmode saves energy as well as eye strain for the user.
* No animations, as its unnecessary and energy consuming.
* Caching with Apollo Client, so it doesnt load more than needed.
* If a search term returns no breeds, there will not be any new fetches as long as new search includes the initial search term that returned zero breeds or that some filters are removed. This is to avoid unnecessary api calls.
* Image file format is WebP, as it is supported by most browsers and creates small and high quality images. We considered using AVIF but, as its not as widely supported yet,  decided on WebP.

### Testing 
The solution contains different types of tests that are describes in detail below. Tests are crucial to the development of the app, to obtain and maintain the desired functionality.

NOTE: We had two issues with the tests.
1. The DogBreedGallery.test failed after some iterations. The team is not sure why it does not run, and has therefore commented it out.
2. Some use of @TS-ignore. The devteam is aware of this not being best practice, but some places in the code, TypeScript errors would lead to endless loops, and never removing red markings. 
The use of @ts-ignore is used as a last resort, and is carefully monitored to be safe. The code that is ignored is fully working in a safe manner.

### Snapshot testing
We use snapshot tests to ensure that user interactions such as filtering, sorting, and navigation work as expected. The snapshots capture the output after each interaction, allowing us to verify that everything functions correctly.

### Component testing
Each component also contains component tests using Vitest. It follows the arrange, act, assert pattern using the describe, it, expect methods within Vitest.

### End-to-End testing
The End-to-End testing is done using Cypress. Cypress is a testing framework to write automated tests, which is useful for validating performance and functionality in real-time reloading.

### Coverage testing
Code coverage analysis has been set up to ensure adequate test coverage across the codebase. This can be found in [coverage folder](frontend\coverage). To test with coverage
[See how to run coverage testing](#how-to-test-with-coverage).

### Linting and Prettier
The project uses ESLint for linting to enforce coding standards and catch potential errors early.
Prettier is used to ensure consistent code formatting across the entire project.




### How to run component tests
Navigate to frontend folder:

```bash
cd frontend
```

then run the following command:

```bash
npm run test
```
_Runs the tests_ 


### How to test E2E using Cypress
Navigate to frontend folder:

```bash
cd frontend
```

then run the following command:

```bash
npx cypress open
```

From there you can choose E2E tests, and use your browser of choice. The tests are run by choosing "specs" (the test you want to run).

By default, the tests are run using the VM-address, meaning you need to be on the NTNU vpn / eduroam network.

If you would like to run E2E tests locally, follow the instructions to run server and frontend, change the "baseUrl" to localhost:port inside the `cypress.config.ts` 

### How to test with coverage
Navigate to frontend folder:

```bash
cd frontend
```

then run the following command:

```bash
npm run coverage
```
_Runs the tests_ 




