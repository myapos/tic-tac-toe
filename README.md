# tic-tac-toe

This tic-tac-toe version was built with Vue 3 in Vite.

### Game Details - Instructions

**Note:** This is an advanced version of [Tic-tac-toe](https://tic-tac-toe-snowy-sigma.vercel.app). This assignment was published in [Greatfrontend](https://www.greatfrontend.com/) platform.

Tic-tac-toe is a game for two players who take turns making space in a three-by-three grid with X or O. The player who succeeds in playing three of their marks in a horizontal, vertical, or diagonal row is the winner. Source: [Wikipedia](https://en.wikipedia.org/wiki/Tic-tac-toe)

Traditionally, tic-tac-toe uses a 3 x 3 grid. In this problem, an advanced version of a tic-tac-toe game is built where the grid has N x N cells on the board and needs M marks in a horizontal, vertical, or diagonal row to win. The following diagram shows an example game where N = {{ N }} and M = {{ M }}.

You can change these parameters by adding to the URL parameters `?N=4&M=3` where `N >= M`. [Try it!](https://tic-tac-toe-snowy-sigma.vercel.app/?N=4&M=4)

#### Player modes

Three player modes are supported: 
- Single player mode (1P) where a human player plays against an AI player. For this mode there are two available selections where the user can select between [minimax](https://en.wikipedia.org/wiki/Minimax) and [negamax](https://en.wikipedia.org/wiki/Minimax) algorithms.
- Two players mode (2P) where two human players can play against other.
- Auto mode (Auto) where two AI players can play against other.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### NodeJS version

node > 18+
