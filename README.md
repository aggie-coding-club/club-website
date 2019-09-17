# TypeScript Project
A TypeScript project template for Aggie Coding Club students to get started with TypeScript.

## What's Included

### Code Style

This project uses a standardized, consistent formatting style enforced by [Prettier](https://prettier.io/), so no concerns about focusing on a code style.

### Dockerfile
**Prerequisite**: Docker must be installed to use this.

This project has a [Dockerfile template](./Dockerfile) that already installs dependencies, compiles TypeScript to JavaScript, and sets the default command to `npm start`

### Testing

A testing setup is already included for you, using [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).

### GitHub Actions (In Progress)

GitHub recently announced their support for [actions](https://github.com/features/actions), which can automate a lot of the headaches involved in working as a team, like ensuring that tests pass, formatting's consistent, and that Docker images can be built successfully. When GitHub Actions become generally available, this template will be updated to use them for CI/CD.


## How to Use

To install packages, just do `npm install` (or `npm i`).

To transpile the TypeScript to JavaScript, do `npm run compile`.

To test the code, do `npm test`.

To run the code, do `npm start`.

To format your code to be consistent with the project, do `npm run fix`.
