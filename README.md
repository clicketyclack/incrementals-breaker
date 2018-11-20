# incrementals-breaker

Breaking browser incremental games.

### How to use (shark-maxer)

This file automatically performs lots of click-spam purchases for shark game, https://cirri.al/sharks/

1. Remove the lines
`Object.defineProperty(exports, "__esModule", { value: true });`
and `exports.SharkMaxer = SharkMaxer;` from the built `shark-maxer.js`.

2. Copy/paste the remaining contents of the js file into the console to define the SharkMaxer class.

3. Run the maxxer. There are two main options to use: `var sm = new SharkMaxer(SharkGame) ; sm.clickSafes();` and `var sm = new SharkMaxer(SharkGame) ; sm.clickEcoSafes();`. The ecosafes option will avoid creating tar.


### Build dependencies

```
npm update
npm install gulp
npm install gulp-sass --save-dev  
npm install browser-sync --save-dev
npm install --save-dev gulp-requirejs
```
