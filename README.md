# hello-vue

[![CI/CD Pipeline](https://github.com/nithyanatarajan/hello-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/nithyanatarajan/hello-vue/actions/workflows/ci.yml)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
# To check for linting errors
npm run lint

# To fix linting errors
npm run lint:fix
```

### Format with [Prettier](https://prettier.io/)

```sh
# To check for formatting errors
npm run format

# To fix formatting errors
npm run format:fix
```

### Environment Variables

This project uses environment variables for configuration. Copy the `.env.example` file to a new file named `.env` and update the values as needed:

```sh
cp .env.example .env
```

Required environment variables:
- `VITE_HOST_API`: The base URL for the API (e.g., http://localhost:3000)

### Git Hooks with [Lefthook](https://github.com/evilmartians/lefthook)

This project uses Lefthook to manage Git hooks. Lefthook will automatically:
- Run format and lint checks before push

Lefthook should be automatically installed when you run `npm install`. If you need to manually install the git hooks, run:

```sh
npm run lefthook:install
```

If you're experiencing issues with changes not being staged or committed properly, ensure that Lefthook is installed correctly by running the above command.

### Docker Setup

```sh
docker build \
  --build-arg VITE_HOST_API=https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3 \
  -t vue-app:latest .

docker run -p 8080:80 vue-app:latest

# open http://localhost:8080 in your browser
```