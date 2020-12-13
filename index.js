const dotenv = require('dotenv')
const server = require('./src/server')
const logEvent = require('./src/events/myEmitter')

dotenv.config()
if (process.env.APP_NAME) {
    try {
        server.listen(process.env.APP_PORT, process.env.HOST_LISTEN, function () {
            if (server.listening) {
                logEvent.emit('APP-INFO', {
                    logTitle: 'SERVER',
                    logMessage: `Server is listening on port ${process.env.APP_PORT}`
                });
            }
        })   
    } catch (e) {
        logEvent.emit('APP-ERROR', {
            logTitle: 'REST-API-FAILED',
            logMessage: err
        });   
    }
} else {
    process.exit(1)
}