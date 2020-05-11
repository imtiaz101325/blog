# Blog

A blog application

# Development

The application is written in JavaScript. To start working on it you need to install Node.js. The following command will install `nvm` a Node.js version manager.

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Please refer to the projects [README](https://github.com/nvm-sh/nvm#installing-and-updating) for any further instructions.

To check that you have Node.js installed run:

```
node --version
npm --version
```

## Front-end

The front-end is built with React.js. To start the app run the following commands from the `./frontend` directory:

1. Install dependencies:
```
npm install
```

2. Start the front-end app:
```
npm start
```
app should start at `localhost:3000`

3. Run tests:
```
npm test
```

## Backend

1. Install PostgresSQL following [this](https://wiki.postgresql.org/wiki/Detailed_installation_guides) or any other guide.

2. Create user and database:
```
CREATE USER blog WITH PASSWORD 'blog';
create database blog;
alter database blog owner to blog;
```

3. Install dependencies:
```
npm install
```

4. Migrate database tables
```
npx sequelize-cli db:migrate
```

4. Start the backend app:
```
npm start
```
app should start at `localhost:8000`

## Notice

Please make sure the Front-end is running at `localhost:3000` and the Backend is running at `localhost:8000` before continuing with development.