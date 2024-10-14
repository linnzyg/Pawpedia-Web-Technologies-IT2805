# Pawpedia

Pawpedia is an application designed to showcase various dog breeds. The first version uses static mocked data to display dog breeds in a gallery view. The gallery view can lead the user to the detailed view about each dog breed by pressing the pictures of the dogs.

The coming versions of Pawpedia will contain a database running a backend meaning more data and dog breeds. Each breed will also have more details and information about the breed itself. Styling will also be done using third party libraries such as shadcn. 

## Features
* Gallery View: Browse all dog breeds in an easy-to-navigate gallery
* Detailed Breed View: Click on a breed to view more detailed information
* Sorting Options: Sort breeds alphabetically or by your favorites
* Filters: Filter breeds by size—small or large dogs
* Search: Quickly search for dog breeds by name

## How to run
### Prerequisites
Make sure you have Node.js 22.5+ and npm 10.8+ installed.

### Install dependencies:
Clone the project in your favorite IDE, navigate to the frontend folder, and then install dependencies using:
```bash
npm install
```

### Start the development server:

```bash
npm run dev
```

## Showcase
Link to VM will be available next version, as it is not required for the first task

## Documentation and choices
The choice of making a dog application was made due to dogs being cute, and motivated all four developers to work on this project with love.

## Tech Stack
* React: Frontend framework
* Language: TypeScript 

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








