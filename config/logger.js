var winston = require('winston');

/* Remove default Logger and add some candy ;) */
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
	colorize: true
	,timestamp: true
});

module.exports = winston;