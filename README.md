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
  DATABASE_URL=postgresql://umbrsoft:umbrsoft@umbrsoft_pgsql:5432/umbrsoft
  ```

### process.example.json to to process.json

Copy the process.example.json file to process.json in the root directory of the backend submodule:

  ```json
  {
    "name": "umbrsoft_backend",
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

## Go to the backend container
  
 ```sh
  docker exec -it umbrsoft_backend /bin/sh
  su node
 ```

## Generate the database schema for prisma

```sh
  npx prisma isntropect && npx prisma generate
```

## Generate the database schema for typeorm

```sh
  npx typeorm-model-generator -h umbrsoft_pgsql -d umbrsoft -u umbrsoft -x umbrsoft -e postgres -s app_access -o ./src/persistences/typeorm/models/access

  npx typeorm-model-generator -h umbrsoft_pgsql -d umbrsoft -u umbrsoft -x umbrsoft -e postgres -s app_crm -o ./src/persistences/typeorm/models/crm
```
