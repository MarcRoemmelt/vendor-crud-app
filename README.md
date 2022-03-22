

# MVP-Factory Take-Home-Task

### Server Side Framework: [NestJs](https://nestjs.com/)

### Authentication

Implemented via Passport. Used strategies:
- Login via local-auth (username+Password)
- Sessions via jwt

### Routes

**[Postman](https://www.postman.com/marcroemmelt/workspace/mvp-factory-take-home-task)**

### Client Side Framework: [ReactJs](https://reactjs.org/)

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
