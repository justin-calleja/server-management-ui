This app is running on Github Pages at [https://justin-calleja.github.io/server-management-ui](https://justin-calleja.github.io/server-management-ui)

To run locally, first install dependencies with `yarn` or `npm i`.

Then run the server with `yarn start` or `npm start`.

This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 3rd party libraries

I used the following 3rd party libraries:

```
"moment": "^2.22.2",
"project-name-generator": "^2.1.5",
```

`moment` was used to easily calculate how much time passed since starting an app on a server and to display this in a nice human-readable way (e.g. "a few seconds ago").

`project-name-generator` was used to generate random names for the servers. The library does not guarantee that the names are unique. I am catering for that by checking each generated name against existing servers and generating another one if the same name already exists. I am using server names to identify servers (when e.g. choosing the one whose app needs updating (e.g. from "init" state to "run")). I'm also using the servers name as the `key` prop for React (to help it efficiently render the list of servers). These are the reasons why the server names need to be unique.

This is a standard React app. I did not feel the need to bring in a 3rd party app to handle state management.

The meat of the app is in `src/containers/ServerCanvas/{ServerCanvas.js,utils.js}`. I separated out any functions which don't require the use of `this` (i.e. which don't require a reference to the instantiated component) in utils.js. This would allow for easier unit testing (although I did not unit test much - just one test which doesn't really cover anything but demos at least some kind of familiarity with Jest / unit testing).

With regards to the "use" of Typescript - note that I am only using the Typescript compiler to do some sanity checks on utils.js (also: the type definitions help me reason about the code while writing it - and they would help when maintaing it). In Visual Studio Code, the compiler can automatically check your code as you're writing it and you can see any issues in the "PROBLEMS" tab. I'm sure there's a way to use `tsc` on the command line to and have it running in watch mode to do the same thing.

The Typescript compiler is configured in tsconfig.json and I'm opting in to use it at the beginning of a file with the comment:

```
// @ts-check
```

(see `src/containers/ServerCanvas/utils.js`).

The components in `src/components` are pure components and are written as functions.

I did not get the designs until today when I finished up the app and don't have enough time to re-write it (plus it was mentioned that the test was about the app's functionality not design).

Re the server SVG - I got that from [https://elements.envato.com/15-network-internet-icons-V9Y9R3](https://elements.envato.com/15-network-internet-icons-V9Y9R3). The colors for the circles were added in [Sketch](https://www.sketchapp.com/). I am not a designer but I could replicate the basic shapes in the icon (given an image of what SVG to create).

Thank you for taking the time to see this.