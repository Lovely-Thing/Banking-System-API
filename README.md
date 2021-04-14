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
  URI = postgres://ccbumjfxvfvdjw:5a27d2c17045e13c6b1ac720bff1b3b89038160d090fcd983f4221ef1eadc6be@ec2-54-216-185-51.eu-west-1.compute.amazonaws.com:5432/d2k7uain0dhcfp
  JWT_SECRET = some-very-very-secret-string-no-one-can-guess
  SALT_ROUNDS_PASSWORD = 12
  PADDING_FOR_PRIVATEKEY_LEFT = You-Think-yoU-Are-BETter-THAAN-Uss???..I-donot-TThink-so
  PADDING_FOR_PRIVATEKEY_RIGHT = dhOOp-se-NikaLKE-ChaaaaV-Sey
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
  
## Accessing the Database from PSQL CLI

- Fire the Terminal and enter the following command.
  
  ```
  psql postgres://ccbumjfxvfvdjw:5a27d2c17045e13c6b1ac720bff1b3b89038160d090fcd983f4221ef1eadc6be@ec2-54-216-185-51.eu-west-1.compute.amazonaws.com:5432/d2k7uain0dhcfp
  ```
- If You have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed, then use this command
  ```
  heroku pg:psql postgresql-amorphous-58722 --app banking-system-he
  ```

### Note 
  This project uses a remote PSQL database which is hosted in Heroku.
