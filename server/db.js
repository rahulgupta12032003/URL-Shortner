const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_CONNECTION_URL)
const db = mongoose.connection;

db.on('connected', () => {
    console.log("Successfully! connected to database")
})
db.on('error', (error) => {
    console.log("Error connecting database", error)
    process.exit(1)
})