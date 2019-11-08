# CLI output issue reproducing repo

## How to
After cloning this repo:
```
yarn install
yarn serve
```
The dev server will start saying no errors are found.

However, you can see a line comment with bad indent in `worker/test.js`.

Just edit that file, for example, delete the blank line, a `WARNING with 0 errors` will display after compiling.

See `reproduce.gif` for the screenshot.
