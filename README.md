# Backend

## Prerequisites

- Node.js v18.18 (LTS Bullseye)
- Fastify
- Prisma
- TypeScript
- PM2

## Install dependencies

  ```bash
  cd backend  && npm ci --silent
  ```

## Configuration

### .env.example to .env

Copy the .env.example file to .env in the root directory of the backend submodule with the following content:

  ```yml
  NODE_ENV=development
  PORT=4554
  DATABASE_URL=postgresql://postgres:postgres@localhost:5432/umbrella
  ```

### process.example.json to to process.json

Copy the process.example.json file to process.json in the root directory of the backend submodule:

  ```json
  {
    "name": "umbrella_backend",
    "script": "./build/server.js",
    "watch": true,
    "ignore_watch": ["node_modules", "tmp"],
    "node_args": "-r tsconfig-paths/register",
    "env": {
      "NODE_OPTIONS": "--max-old-space-size=2048",
      "TS_NODE_BASEURL": "./build"
    }
  }
  ```

  *Adjust the configuration according to your specific needs.*