# Banking System Using Homomorphic Encryption

This is a project which demonstrates Homomorphic Encryption.

## Technologies Used
1. [Yarn](https://yarnpkg.com/)
2. [Node v14.16.0](https://nodejs.org)
3. [PostgreSQL v13.1](https://www.postgresql.org/)
4. [TypeScript](https://www.typescriptlang.org/)
5. [TypeORM](https://typeorm.io/)
6. [Heroku](https://devcenter.heroku.com/)

## Setting Up the Project Locally

- Open the project and fire up the terminal and then enter the following command.
 
    ```
    yarn run clean-install
    ```

- Create a ```.env``` file in the project and add the following details
  ```dotenv
  PORT = 8000
  URI = postgres://isvkwrqqjnieko:baded8b4facfa3389ac9f416d0e515eb565aa6860f86b55bce81f1921a651c64@ec2-52-45-73-150.compute-1.amazonaws.com:5432/d7ca2tpfq2u8pv
  ```
 
## Taking Advantage of Linting

- Open VSCode Editor or WebStorm and set up the following extensions.
  
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Starting the Local Server

- Open the terminal and enter the following command
  
  ```
  yarn start
  ```
  
## Accessing the Database from PSQL CLI

- Fire the Terminal and enter the following command.
  
  ```
  psql postgres://isvkwrqqjnieko:baded8b4facfa3389ac9f416d0e515eb565aa6860f86b55bce81f1921a651c64@ec2-52-45-73-150.compute-1.amazonaws.com:5432/d7ca2tpfq2u8pv
  ```
- If You have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed, then use this command
  ```
  heroku pg:psql postgresql-concave-21936 --app banking-system-aditya-dev
  ```

### Note 
  This project uses a remote PSQL database which is hosted in Heroku.
