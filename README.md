# Pawpedia

Pawpedia is an application designed to showcase various dog breeds. There is a gallery view displaying dog breeds fetched from a database. The gallery view can lead the user to the detailed view about each dog breed by pressing the pictures of the dogs, where you can also read and leave comments about the bread.

## Features
* Gallery View: Browse all dog breeds in an easy-to-navigate gallery
* Detailed Breed View: Click on a breed to view more detailed information
* Sorting Options: Sort breeds alphabetically or by your favorites
* Filters: Filter breeds by size—small or large dogs
* Search: Quickly search for dog breeds by name
* COMING SOON: Favorites. For the next version there will be possible to add favorites, that gets stored in your browser. 

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
Link to VM will be available next version, as it is not required for the first task

## Documentation and choices
The choice of making a dog application was made due to dogs being cute, and motivated all four developers to work on this project with love.

### Static images
Our images are stored in a public folder as static files since there are no user features in the app that require uploading or downloading images. This makes it simple to manage images, as they’re uploaded only when needed. 

## Tech Stack
* React with TypeScript: Frontend framework
* Apollo Client: For handling GraphQL queries and managing local/global app state.
* GraphQL: API query language used to fetch dog breed data from the server.
* MongoDB: Database for storing dog breed information.

## Testing and code quality
We use snapshot tests to ensure that user interactions such as filtering, sorting, and navigation work as expected. The snapshots capture the output after each interaction, allowing us to verify that everything functions correctly.

Each component also contains component tests using Vitest. It follows the arrange, act, assert pattern using the describe, it, expect methods within Vitest.

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








