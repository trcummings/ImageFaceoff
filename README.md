# Image Faceoff

### What is This?

Hello, I am Thomsen Cummings, and this is a fun little Hot or Not type app that uses Pixabay to pull random images and have the user decide between which two they like best. It uses an ELO type ranking system to determine the most favorited image.

**Tech stack:**

- React.js + SASS (incl. a reset.css file, FontAwesome 5.14, and Google Fonts' Open Sans)
- Babel and Webpack 4.0 for the build pipeline
- A simple Express.js config for static serving
- Jest and Enzyme for testing, if needed

## How to Run

### In Production

1. run `npm install`
2. run `node server.js` — This will start up the mock backend server.
3. In a new tab, run `npm run prod` — This will build the project in production mode with Webpack.
4. Open `localhost:5000` in your browser, and et voilà!

### In Development

1. run `npm install` — You can skip this step if you've already installed the node modules.
2. IF THIS IS YOUR FIRST TIME AFTER CLONING run `npm run prod` - This will create the "public" folder, and create the index.html for the dev server to host. Otherwise, skip this step (unless your public/ folder is empty, then just run it again).
3. run `npm run dev` — This concurrently run the server and start up a Webpack dev server to host the build on `localhost:8080`.

### Run the Test Suite

**NB: This test suite will only run on Node Version 10 or later**, which I believe is an issue with Jest. For the purposes of development I have been using Node Version 12.14.1.

1. run `npm run test` — This will run the Jest test suite, set up the Enzyme adapter, and run through all of the tests.
2. Look at all that green!
