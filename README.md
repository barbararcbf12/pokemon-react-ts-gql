# Pokemon App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Functionalities

- Fetch data from the Pokemon Graphql endpoint https://beta.pokeapi.co/graphql/v1beta paginated
- Generate types based on the Graphql schema automatically
- The user can:
  - click on a Pokemon to see more information about it
  - search for a Pokemon by `name` or `ability`
  - order the list of pokemons by `name`, `height` or `weight`
  - navigate back and forward through the available pages of results
  - chose how many results should be displayed per page

## Deployed app

[Pokemon App](https://barbararcbf12.github.io/pokemon-react-ts-gql/)

## Available Scripts

In the project directory, you can run:

### Run application

`yarn start`

### Generate types

`yarn codegen`

### Run tests

`yarn test`

### Build application

`yarn build`

### Remove the single build dependency from your project

`yarn eject`
