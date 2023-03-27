const winston = require("winston")
const expressWinston = require("express-winston")
require('winston-mongodb')
require("dotenv").config()

const logger = expressWinston.logger({
    transports: [
        new winston.transports.Console({
            level: "error"
        }),
        new winston.transports.MongoDB({
            level: "error",
            db: process.env.MongoURL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'server_logs',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
})


module.exports={
    logger
}
