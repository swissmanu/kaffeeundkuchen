# Kaffee und Kuchen
*/ˈkafe ʔʊnt kuxən/, English: Coffee And Pi*

[![Build Status](https://travis-ci.org/swissmanu/kaffeeundkuchen.png?branch=master)](https://travis-ci.org/swissmanu/kaffeeundkuchen) [![Coverage Status](https://coveralls.io/repos/swissmanu/kaffeeundkuchen/badge.png)](https://coveralls.io/r/swissmanu/kaffeeundkuchen)

## Overview
"Kaffee und Kuchen" is a spotify party player written in JavaScript. The original project is thought to be runned on a Raspberry Pi and supports Apples AirPlay for streaming your music anywhere you want.

## Run the first time
### Configuration
Copy `config/config.example.js` to `config/config.js` and modify the configuration to your needs.

### Setup
Calling `npm run setup` inside the projects folder will run the following steps automatically:

* `npm install`
* `bower install`
* `grunt package` for the `angular-latest` bower component
* `grunt` for the *Kafffee und Kuchen* itself which fulfills the following tasks:
	* Prepare the client source and provide one minified JavaScript file in `src/client/public/js/kaffeeundkuchen.min.js`
	* Precompile the SASS style definitions and provide the CSS in `src/client/public/css/kaffeendkuchen.css`

### Run
Having all files in place now, just execute `npm start` to fire up *Kaffee und Kuchen*.