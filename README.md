# Pawpedia

Pawpedia is an application designed to showcase various dog breeds. There is a gallery view displaying dog breeds fetched from a database. The gallery view can lead the user to the detailed view about each dog breed by pressing the pictures of the dogs, where you can also read and leave comments about the bread.

## Features
* Gallery View: Browse all dog breeds in an easy-to-navigate gallery
* Detailed Breed View: Click on a breed to view more detailed information
* Sorting Options: Sort breeds alphabetically
* Filters: Filter breeds by size
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
* React with TypeScript: Frontend framework
* Apollo Client: For handling GraphQL queries and managing local/global app state.
* GraphQL: API query language used to fetch dog breed data from the server.
* MongoDB: Database for storing dog breed information.
* STATE MANAGEMENT - TO DO
* UI-libraries - TO DO

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

## Testing and code quality

### Snapshot testing
We use snapshot tests to ensure that user interactions such as filtering, sorting, and navigation work as expected. The snapshots capture the output after each interaction, allowing us to verify that everything functions correctly.

### Component testing
Each component also contains component tests using Vitest. It follows the arrange, act, assert pattern using the describe, it, expect methods within Vitest.

### End-to-End testing
to do

### Coverage testing
Code coverage analysis has been set up to ensure adequate test coverage across the codebase. This can be found in [coverage folder](frontend\coverage). To test with coverage
[See how to run coverage testing](#how-to-test-with-coverage).

### Linting and Prettier
The project uses ESLint for linting to enforce coding standards and catch potential errors early.
Prettier is used to ensure consistent code formatting across the entire project.

### Testing
### How to test
Navigate to frontend folder:

```bash
cd frontend
```

then run the following command:

```bash
npm run test
```
_Runs the tests_ 

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




