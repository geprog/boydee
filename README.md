# Webapp - Boilerplate

This repository serves as a boilerplate for jump starting a node js + vue js application.\
[Docker](https://www.docker.com/) will be used extensively to abstract all
dependencies from the host OS in a container.\
This makes it easy to work on projects with different software versions and keep
the dev environment as close to production as possible.
[Typescript](https://www.typescriptlang.org) as a language that compiles to plain
JavaScript but helps development will be used. \
The main purpose is to explain a possible development environment for
[Node JS](https://nodejs.org/en/) development and get started quickly.

## Backend

Documentation for a sample Express Setup can be found in `/app/backend/README.md`

## Frontend

Documentation for a sample Vue JS Setup can be found in `/app/frontend/README.md`

## VS Code Dev Environment

To get started [install Docker](https://docs.docker.com/install/) and
[VS Code](https://code.visualstudio.com/). Open VS Code and install the
[Remote Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).
Thats all the dependencies need. Next clone this repo and open the folder in
VS Code.
Setup environment variables by adding a `docker/.env` file, `docker/variables.env.dev` serves as a template.
A popup appears that asks to reopen in container.
After clicking that VS Code automatically starts container(s) as defined in `.devcontainter/ devcontainer.json` and connects VS Code to it. The Language Server and other
extensions as well as the integrated terminal are now running inside the container,
your files are mounted to that container so you can work without noticing much of that.

### Install dependencies

```
yarn install
```

Start backend and frontend devservers by running the following command in the root directory:

```
yarn start
```

This builds all libs and apps and registers watch tasks for each of them so that
code is getting recompiled on changes.

Each lib and app can be started on its own as well (via there own start script)
but there might be missing some watch tasks on dependent workspace packages.

## Testing

### Unit tests

Unit testing is done by [jest](https://jestjs.io/) (`ts-jest`).

To run all unit test simply run:

```
yarn run test:unit
```

Tests are placed inside `<module>/tests/unit` and should and end with `.spec.ts` or `.test.ts`.

## Debugging

### Backend

`node` is started with `--inspect` so a debugger is started by default on port `9229`.
In VS Code the debugger can be invoced with:

```
Debug: Attach to Node Proces
```

## TODO

- [ ] decide on using gitlab issue management and which repo (there already exits issues in Node-Boilerplate....)
- [ ] add DOCs to things already working
- [ ] make a list/issues what is still to do
