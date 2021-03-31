# Banking System Using Homomorphic Encryption

This is a project which demonstrates Homomorphic Encryption.

## Technologies Used
1. [Yarn](https://yarnpkg.com/)
2. [Node v14.16.0](https://nodejs.org)
3. [PostgreSQL v13.1](https://www.postgresql.org/)
4. [TypeScript](https://www.typescriptlang.org/)
5. [TypeORM](https://typeorm.io/)

## Setting Up the Project Locally

- Open the project and fire up the terminal and then enter the following command.
 
    ```
    yarn run clean-install
    ```

- Create a ```.env``` file in the project and add the following details
  ```dotenv
  PORT = 8000
  URI = postgres://zuvzyhnvuaalio:c041c3f990aff74e3eee18dbd0391d8dc2695803243e1e0b79bffd1e14712342@ec2-54-72-155-238.eu-west-1.compute.amazonaws.com:5432/ddr537u7rgau4l
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
  psql postgres://zuvzyhnvuaalio:c041c3f990aff74e3eee18dbd0391d8dc2695803243e1e0b79bffd1e14712342@ec2-54-72-155-238.eu-west-1.compute.amazonaws.com:5432/ddr537u7rgau4l
  ```

### Note 
  This project uses a remote PSQL database which is hosted in Heroku.
