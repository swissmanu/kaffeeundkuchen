# Kaffee und Kuchen
*/ˈkafe ʔʊnt kuxən/, English: Coffee And Pi*

[![Build Status](https://travis-ci.org/swissmanu/kaffeeundkuchen.png?branch=master)](https://travis-ci.org/swissmanu/kaffeeundkuchen) [![Coverage Status](https://coveralls.io/repos/swissmanu/kaffeeundkuchen/badge.png)](https://coveralls.io/r/swissmanu/kaffeeundkuchen)

## Overview
"Kaffee und Kuchen" is a spotify party player written in JavaScript. The original project is thought to be runned on a Raspberry Pi and supports Apples AirPlay for streaming your music anywhere you want.

## Configuration, build and run
### Configuration
Copy `config/config.example.js` to `config/config.js` and modify the configuration to your needs.

### Build
Running `grunt` from the shell will prepare the following things for you:

* Prepare the client source and provide one minified JavaScript file in `src/client/public/js/kaffeeundkuchen.min.js`
* Precompile the SASS styles and provide the CSS in `src/client/public/css/kaffeendkuchen.css`

I suggest to execute the build on your development machine. The Pi takes more time to complete since its lower CPU power.

### Run
Having all files in place now, just execute `npm start` to fire up *Kaffee und Kuchen*.