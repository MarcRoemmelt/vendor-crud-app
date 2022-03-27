# MVP-Factory Take-Home-Task

[https://vendor-crud-app.vercel.app/](https://vendor-crud-app.vercel.app/)

## Serve Locally

Run
- `pnpm install` (install via `npm i -g pnpm` if necessary)
- `npx nx serve mongodb` (requires `docker-compose` for the local database)
- `npx nx serve server` (runs at [localhost:3333](http://localhost:3333) by default)
- `npx nx serve client` (runs at [localhost:4200](http://localhost:4200) by default)

### Server Side Framework: [NestJs](https://nestjs.com/)

### Routes

**[Swagger](https://vendor-crud-app.herokuapp.com/api/static/index.html)**
**[Postman](https://www.postman.com/marcroemmelt/workspace/mvp-factory-take-home-task)**

### Client Side Framework: [ReactJs](https://reactjs.org/)

## Running unit tests

Run `nx test server` to execute the unit tests via [Jest](https://jestjs.io).

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
