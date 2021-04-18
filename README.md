# Banking System Using Homomorphic Encryption

This is a project which demonstrates Homomorphic Encryption using Paillier Encryption.

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
  URI = POSTGRES_DB_URL
  JWT_SECRET = SECRET_KEY
  SALT_ROUNDS_PASSWORD = 12
  PADDING_FOR_PRIVATEKEY_LEFT = PADDING_RANDOM
  PADDING_FOR_PRIVATEKEY_RIGHT = PADDING_RANDOM
  SECRET_PROP = accountNumber
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
## Author

- [Aditya Manikanth Rao](https://github.com/AdityaManikanth2810)

### Note 
  This project uses a remote PSQL database which is hosted in Heroku.

