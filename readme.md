TAWK API
========

Api for the tawk demo application.

# Installation

```
npm install (or yarn)
```

# Setup

Add a `.env` file to the root folder of the repository. The `.env` file needs a connection string to a MongoDB database for the `MONGODB_URI` variable.

```
MONGODB_URI={your mongodb connection string}
```

# Development

To run the project locally simply execute the following command. The API should start listening on port `3001`.

```
npm run development (or yarn development)
```

# Building

Running the following command will build the source files in `src` and output them to the `lib` folder. When running in production, the API will use the `lib` files. Notice that the `package.json` scripts contains a `postinstall` script executing `npm run buld`. If you use a host like Heroku, then the building will happen automatically because of this.

The `lib` folder is ignored by git.

```
npm run build (or yarn build)
```

# Production

To run in production mode, make sure that you have the necessary environment variables configured. You can use a `.env.production` file or your hosts environment variables system. `NODE_ENV` should be set to `production`.

First, build the API as instructed above. Secondly, start the server by running:

```
npm start (or yarn start)
```

Available environment variables to configure:

```
NODE_ENV (should be set to production)
MONGODB_URI (your connection string)
HOST (the host to bind to, defaults to 0.0.0.0)
PORT (the port to bind to, defaults to 3001)
MONGOOSE_DEBUG (set to true if you want log messages from mongoose)
```
